<?php

namespace App\Services;

use App\Repositories\DocumentRepository;
use App\Services\RAG\RerankingService;
use Laravel\Ai\Responses\RerankingResponse;

class DocumentService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected readonly DocumentRepository $repository,
        protected readonly RerankingService $rerankService
    ) {}

    public function getDocuments()
    {
        return response()->json([
            'data' => $this->repository->fetchDocuments()->toArray(),
            'status' => true,
        ]);
    }

    public function showDocument(int $documentId)
    {
        return response()->json([
            'data' => $this->repository->findOrFailDocument($documentId, ['conversation']),
            'status' => true,
        ]);
    }

    public function vectorSearch(array $embedding, string $query): RerankingResponse
    {
        $documents = $this->repository->hybridVectorSearch(embededPrompt: $embedding, query: $query);

        return $this->rerankService->rerank( 
            query: $query, 
            documents: $documents->pluck('content')->toArray()
        );
    }
}
