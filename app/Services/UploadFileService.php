<?php

namespace App\Services;

use App\Models\Documents;
use App\Repositories\DocumentRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadFileService
{
    public function __construct(
        protected readonly DocumentRepository $repository,
        protected readonly FileStorageService $fileService
    ) {}
    public function upload(UploadedFile $resume)
    {
        try {
            $fileDetails = $this->storeFileToStorage($resume);

            $data = DB::transaction(function () use ($fileDetails, $resume) {
                $path = $this->fileService->storeFile(
                    path: "resumes",
                    file: $resume,
                    name: $fileDetails['new_file_name']
                );
                $fileData = $this->repository->uploadDocument($fileDetails,$path);
                return $fileData;
            });

            return response()->json([ 'data' => $data, 'status' => true, 'message' => null ]);
        } catch (\Exception $ex) {
            return response()->json([
                'data' => $ex->getMessage(),
                'status' => true,
                'message' => null,
            ], $ex->getCode() ?? 500);
        }
    }

    private function storeFileToStorage(UploadedFile $resume)
    {
        $fileName = $resume->getClientOriginalName();
        $fileType = $resume->getClientMimeType();
        $fileSize = $resume->getSize();
        $name = Str::uuid().'-'.$resume->getExtension();

        return [
            'original_name' => $fileName,
            'mime_type' => $fileType,
            'size' => $fileSize,
            'new_file_name' => $name,
        ];
    }
}
