<?php

namespace App\Services\RAG;

use App\Models\Conversation;

class QueryRewriteService
{
    public function rewrite(Conversation $convo, string $query)
    {
        $summary = $convo->summary ?? null;
        
    }

}
