<?php

namespace App\Services;

use App\Models\Documents;
use App\Repositories\DocumentRepository;
use App\Services\RAG\RerankingService;
use App\Strategies\SemanticChunkingStrategy;
use Ecourty\TextChunker\Strategy\ParagraphChunkingStrategy;
use Ecourty\TextChunker\TextChunker;
use Laravel\Ai\Responses\RerankingResponse;

class DocumentService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected readonly DocumentRepository $repository,
        protected readonly RerankingService $rerankService,
        protected readonly SemanticChunkingStrategy $strategy
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

    public function vectorSearch(Documents $docu, array $embedding, string $query): RerankingResponse
    {

        $documents = $this->repository->vectorEmbeddingSearch(docu : $docu, embededPrompt: $embedding);

        $finalChunks = $this->strategy->combineChunks(
            chunks: $documents->map(fn ($data) => $data['content'])->toArray(),
            similarities: $this->strategy->compareNeighbors(
                embeddings: $documents->pluck('embedding')->map(fn($vector) => $vector->toArray())->toArray()
            )
        );
       
        return $this->rerankService->rerank(
            query: $query,
            documents: $finalChunks
        );
    }

    public function chunkDocumentData(string $fileText)
    {
        $chunker = new TextChunker;
        return iterator_to_array($chunker->setText($fileText)->chunk(new ParagraphChunkingStrategy));
    }
}
