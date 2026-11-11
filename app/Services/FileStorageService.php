<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileStorageService
{
    public readonly string $fileSystem;
    public static string $fileData;

    public static string $path = "resumes";
    public function __construct() {
        $this->fileSystem = self::$fileData = config('filesystems.default');
    }

    public function storeFile(UploadedFile $file, string $name)
    {
        return Storage::disk($this->fileSystem)->putFileAs(
            self::$path,
            $file,
            $name
        );
    }

    public static function publicFilePath(string $fileName)
    {
        $fileData = self::$fileData;
        $fullPath = Storage::disk($fileData)->path(self::$path."/".$fileName);
        if(!$fullPath) return null;

        return $fullPath;
    }
}
