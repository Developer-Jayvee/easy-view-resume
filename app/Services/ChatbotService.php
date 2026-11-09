<?php

namespace App\Services;

use App\Http\Prompts\System\RagAssistantPrompt;
use App\Http\Prompts\Templates\RagContextPrompt;
use App\Models\Documents;
use App\Repositories\ConversationRepository;

class ChatbotService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected readonly MessageServices $service,
        protected readonly GeminiService $modelService,
        protected readonly ConversationRepository $convoRepo,
        protected readonly DocumentService $docService
    ) {}

    public function agentPrompt(int $convoId, Documents $docu, string $prompt, string $role = 'user')
    {

        try {

            $message = $this->service->storeMessage(convoId: $convoId, docu: $docu, prompt: $prompt, role: 'agent');

            if (! $message) {
                throw new \Exception('Failed to store message');
            }

            $embededPrompt = $this->modelService->embedContent($prompt);

            $search = $this->docService->vectorSearch($docu,$embededPrompt,$prompt);
            
            $context = collect($search->results)->map(fn ($data) => $data->document)->implode('\n\n');

            $systemInstructions = RagAssistantPrompt::get();
            $userPrompt = RagContextPrompt::build(
                $prompt,
                $context
            );

            $chat = $this->modelService->startChat(systemInstructions: $systemInstructions);

            return response()->stream(function () use ($chat, $userPrompt) {
                $stream = $chat->streamSendMessage($userPrompt);
                foreach ($stream as $response) {
                    $text = $response->text();

                    if ($text) {
                        yield $text;
                    }
                }
            }, headers: [
                'X-Accel-Buffering' => 'no',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'data' => null,
                'status' => false,
                'message' => $th->getMessage(),
            ], 500);
        }

    }


}
