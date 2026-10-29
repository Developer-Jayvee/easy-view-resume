<?php

namespace App\Services;

use App\Repositories\DocumentRepository;

class DocumentService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        protected readonly DocumentRepository $repository
    ) {}

    public function getDocuments()
    {
        return response()->json([
            'data' => $this->repository->fetchDocuments()->toArray(),
            'status' => true
        ]);
    }

    public function showDocument(int $documentId)
    {
        return response()->json([
            'data' => $this->repository->findOrFailDocument($documentId),
            'status' => true
        ]);
    }
}
