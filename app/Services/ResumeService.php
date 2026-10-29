<?php

namespace App\Services;

use App\Helpers\TextHelper;
use App\Models\Documents;
use Illuminate\Http\UploadedFile;
use Spatie\PdfToText\Pdf;

class ResumeService
{
    public function __construct(
        protected readonly GeminiService $geminiService,
    ) {}

    public function convertBatchEmbeddings(UploadedFile $file, Documents $docu): array
    {
        $response = [];
        $documentId = $docu->id ?? null;

        if (! $documentId || $documentId === null) {
            throw new \Exception('Failed to store document');
        }

        $fileTexts = (new Pdf)->setPdf($file)->text();
        $data = TextHelper::chunkText($fileTexts);
        $embeddings = $this->geminiService->embedBatchContent($data);

        foreach ($embeddings->embeddings as $index => $emb) {
            $embed = '[' . implode(',', $emb->values) . ']';
            $response[] = [
                'document_id' => $documentId,
                'content' => $data[$index],
                'embedding' => $embed,
                'metadata' => null,
                'chunk_index' => $index,
            ];
        }
        return $response;
    }
}
