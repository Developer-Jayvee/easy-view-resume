<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadFileRequests;
use App\Services\UploadFileService;

class UploadFileController extends Controller
{
    public function __construct(
        protected readonly UploadFileService $service
    ) {}
    public function upload(UploadFileRequests $request)
    {
        return $this->service->upload(
            resume: $request->file('resume')
        );
    }
}
