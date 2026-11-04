<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChatbotRequest;
use App\Repositories\DocumentRepository;
use App\Services\ChatbotService;
use App\Services\MessageServices;

class ChatbotController extends Controller
{
    public function __construct(
        protected readonly MessageServices $service,
        protected readonly ChatbotService $chatbotService,
        protected readonly DocumentRepository $docuRepo
    ) {}

    public function userPrompt(StoreChatbotRequest $request)
    {
        return $this->service->storeMessage(
            convoId: (int) $request->validated('convo_id'),
            docu: $this->docuRepo->findOrFailDocument($request->validated('document_id')),
            prompt: $request->validated('chat')
        );
    }

    public function agentPrompt(StoreChatbotRequest $request)
    {
        return $this->chatbotService->agentPrompt(
            convoId: $request->validated('convo_id'),
            docu: $this->docuRepo->findOrFailDocument($request->validated('document_id')),
            prompt: $request->validated('chat'),
            role: 'agent'
        );
    }
}
