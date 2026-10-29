<?php

namespace App\Repositories;

use App\Models\DocumentChunks;
use App\Models\Documents;
use Illuminate\Validation\ValidationException;

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
}
