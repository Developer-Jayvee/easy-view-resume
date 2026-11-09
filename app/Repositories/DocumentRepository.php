<?php

namespace App\Repositories;

use App\Models\DocumentChunks;
use App\Models\Documents;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;
use Pgvector\Laravel\Distance;

class DocumentRepository
{
    public function uploadDocument(array $fileDetails, string $path)
    {
        return Documents::query()->create([
            'fileName' => $fileDetails['original_name'],
            'status' => 'pending',
            'fileType' => $fileDetails['mime_type'],
            'fileUrl' => $path,
            'fileSize' => $fileDetails['size'],
        ]);
    }
    
    public function storeOneChunk(int $id ,array $data)
    {
        return DocumentChunks::query()->create([
            'document_id' => $id,
            'content' => $data['content'],
            'embedding' => $data['embedding'],
            'metadata' => $data['metadata'] ?? null,
            'chunk_index' => $data['index']
        ]);
    }

    public function batchStoreChunk(int $id, array $data) 
    {
        return DocumentChunks::query()->insert($data);
    }

    public function fetchPaginatedDocuments(int $perPage = 10 , int $page = 1)
    {
        return Documents::query()->paginate(
            perPage: $perPage,
            page: $page
        );
    }
    
    public function fetchDocuments()
    {
        return Documents::query()->get();
    }

    public function findOrFailDocument(int $documentId, array $relations = [])
    {
        return Documents::query()->with($relations)->findOrFail($documentId);
    }

    /**
     * return Collection<int,DocumentChunks>
     */
    public function vectorEmbeddingSearch(array $embededPrompt, int $limit = 5): Collection
    {
        return  DocumentChunks::query()->nearestNeighbors(
                'embedding',
                $embededPrompt,
                Distance::Cosine
            )->take($limit)->get();
    }

    public function keywordContentSearch(string $query, int $limit = 5) 
    {
        return DocumentChunks::search($query)->take($limit)->get();
    }

    public function findAndKeywordSearch(Documents $docu, string $query, int $limit = 5)
    {
        return DocumentChunks::search($query)->where('document_id',$docu->id)->take($limit)->get();
    }

    public function hybridVectorSearch(Documents $docu,string $query , array $embededPrompt, int $limit = 5)
    {
        return $docu->chunks()->getQuery()->nearestNeighbors(
                'embedding',
                $embededPrompt,
                Distance::Cosine
            )->take($limit)->get();
    }
}
