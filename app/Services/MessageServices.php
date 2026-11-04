<?php

namespace App\Services;

use App\Models\Documents;
use App\Repositories\ConversationRepository;
use App\Repositories\MessageRepository;
use Illuminate\Support\Facades\DB;

class MessageServices
{
    public function __construct(
        protected readonly ConversationRepository $convoRepo,
        protected readonly MessageRepository $messageRepo,
    ) {}

    public function storeMessage(int $convoId, Documents $docu, string $prompt, string $role = 'user')
    {
        try {
            $message = DB::transaction(function () use ($convoId, $prompt, $docu , $role) {
                $conversation = $this->convoRepo->findConvo($convoId);

                $title = explode(' ', $prompt);

                if (! $conversation) {
                    $conversation = $this->convoRepo->createConvo(title: $title[0], docuId: $docu->id);
                }

                return $this->messageRepo->createMessage(convoId: $conversation->id, prompt: $prompt, role: $role);

            });

            return response()->json(['data' => $message, 'status' => true]);

        } catch (\Throwable $th) {
            return response()->json(['data' => $th->getMessage(), 'status' => false], 500);
        }

    }
}
