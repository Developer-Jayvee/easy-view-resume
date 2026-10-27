<?php

namespace App\Services;

use App\Models\Documents;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadFileService
{
    public function upload(UploadedFile $resume)
    {
        try {
            $fileDetails = $this->storeFileToStorage($resume);

            $data = DB::transaction(function () use ($fileDetails, $resume) {
                $path = Storage::disk(config('filesystems.default'))->putFileAs(
                    'resumes',
                    $resume,
                    $fileDetails['new_file_name']
                );
                
                $fileData = Documents::query()->create([
                    'fileName' => $fileDetails['original_name'],
                    'status' => 'pending',
                    'fileType' => $fileDetails['mime_type'],
                    'fileUrl' => $path,
                    'fileSize' => $fileDetails['size'],
                ]);

                return $fileData;
            });

            return response()->json([
                'data' => $data,
                'status' => true,
                'message' => null,
            ]);
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
