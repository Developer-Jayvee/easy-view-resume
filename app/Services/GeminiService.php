<?php

namespace App\Services;

use Gemini\Data\Content;
use Gemini\Laravel\Facades\Gemini;
use Gemini\Requests\GenerativeModel\EmbedContentRequest;
use Gemini\Resources\EmbeddingModel;
use Gemini\Resources\GenerativeModel;
use Gemini\Responses\GenerativeModel\BatchEmbedContentsResponse;
use Gemini\Responses\GenerativeModel\EmbedContentResponse;
use Gemini\Responses\GenerativeModel\GenerateContentResponse;

class GeminiService
{
    protected readonly EmbeddingModel $embedModel;

    protected readonly GenerativeModel $generativeModel;


    protected readonly string $embedModelName;

    public function __construct()
    {
        $embedModel = config('gemini.model.embed');
        $generativeModel = config('gemini.model.generative');

        $this->embedModelName = $embedModel;
        $this->embedModel = Gemini::embeddingModel(model: $embedModel);
        $this->generativeModel = Gemini::generativeModel(model: $generativeModel);
    }

    public function embedContent(string $data): EmbedContentResponse
    {
        $text = Content::parse($data);

        return $this->embedModel->embedContent($text);
    }

    public function embedBatchContent(array $data): BatchEmbedContentsResponse
    {
        $requests = [];

        foreach ($data as $key => $text) {
            $requests[] = new EmbedContentRequest(
                model: $this->embedModelName,
                part: $text,
                outputDimensionality: config('gemini.output_dimension')
            );
        }
        return $this->embedModel->batchEmbedContents(...$requests);
    }

    public function generateContent(string|array $data): GenerateContentResponse
    {
        $content = Content::parse($data);

        return $this->generativeModel->generateContent($content);
    }
}
