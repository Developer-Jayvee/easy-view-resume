<?php

namespace App\Repositories;

use App\Models\Message;

class MessageRepository
{
    public function createMessage(int $convoId, string $prompt, string $role = 'user')
    {
        return Message::query()->create([
            'conversation_id' => $convoId,
            'role' => $role,
            'content' => $prompt,
        ]);
    }
}
