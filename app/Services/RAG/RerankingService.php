<?php

namespace App\Services\RAG;

use Laravel\Ai\Enums\Lab;
use Laravel\Ai\Reranking;

class RerankingService
{
    private int $default_limit;
    private int $default_timeout;

    public function __construct() 
    {
        $this->default_limit = config('ai.default_limit_for_reranking');    
        $this->default_timeout = config('ai.default_timeout_for_reranking');
    }
    public function rerank(
        string $query,
        array $documents,
        int|null $limit = null,
        int|null $timeOut = null
    ) {
        return Reranking::of($documents)
            ->limit($limit ?? $this->default_limit )
            ->timeout($timeOut ?? $this->default_timeout)
            ->rerank($query, provider: Lab::Cohere);
    }
}
