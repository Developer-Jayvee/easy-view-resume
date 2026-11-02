<?php

namespace App\Repositories;

use App\Models\Conversation;

class ConversationRepository
{

    public function findConvo(int $convoId)
    {
        return Conversation::query()->find($convoId);
    }

    public function findOrFailConvo(int $convoId)
    {
        return Conversation::query()->findOrFail($convoId);
    }

    public function createConvo(string $title, int $docuId)
    {
        return Conversation::query()->create([
            'title' => $title,
            'document_id' => $docuId,
        ]);
    }
}
