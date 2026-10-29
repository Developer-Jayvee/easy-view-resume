<?php

namespace App\Repositories;

use App\Models\Documents;

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
}
