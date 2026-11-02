<?php

namespace App\Services;

use App\Models\Documents;
use App\Repositories\ConversationRepository;
use App\Repositories\MessageRepository;

class MessageServices
{
    public function __construct(
        protected readonly ConversationRepository $convoRepo,
        protected readonly MessageRepository $messageRepo,
    ) {}

    public function storeMessage(int $convoId, Documents $docu, string $prompt, string $role = 'user')
    {
        try {
            $conversation = $this->convoRepo->findConvo($convoId);

            $title = explode(' ', $prompt);

            if (! $conversation) {
                $conversation = $this->convoRepo->createConvo(title: $title[0], docuId: $docu->id);
            }

            $message = $this->messageRepo->createMessage(docuId: $docu->id, prompt: $prompt, role: $role);

            return response()->json(['data' => $message, 'status' => true]);

        } catch (\Throwable $th) {
            return response()->json(['data' => $th->getMessage(), 'status' => false], 500);
        }

    }
}
