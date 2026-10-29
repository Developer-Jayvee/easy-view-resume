<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileStorageService
{
    private readonly string $fileSystem;

    public function __construct() {
        $this->fileSystem = config('filesystems.default');
    }

    public function storeFile(string $path, UploadedFile $file, string $name)
    {
        return Storage::disk($this->fileSystem)->putFileAs(
            $path,
            $file,
            $name
        );
    }
}
