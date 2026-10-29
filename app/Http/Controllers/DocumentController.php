<?php

namespace App\Http\Controllers;

use App\Services\DocumentService;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function __construct(
        private readonly DocumentService $docService
    ) {}
    public function index()
    {
        return $this->docService->getDocuments();
    }

    public function show(int $documentId)
    {
        return $this->docService->showDocument($documentId);
    }
}
