<?php

namespace App\Repositories;

use App\Models\Message;

class MessageRepository
{
    public function createMessage(int $docuId, string $prompt, string $role = 'user')
    {
        return Message::query()->create([
            'conversation_id' => $docuId,
            'role' => $role,
            'content' => $prompt,
        ]);
    }
}
