<?php

namespace App\Strategies;

class SemanticChunkingStrategy
{
    public function __construct(
        private CosineSimilarityStrategy $cosineSimilarity
    ) {}

    public function compareNeighbors(array $embeddings): array
    {
        $results = [];
        for ($i = 0; $i < count($embeddings) - 1; $i++) {
            $results[] = [
                'from' => $i,
                'to' => $i + 1,
                'similarity' => ($this->cosineSimilarity)(
                    $embeddings[$i],
                    $embeddings[$i + 1]
                ),
            ];
        }
        return $results;
    }

    public function combineChunks(
        array $chunks,
        array $similarities,
        float $threshold = 0.72
    ): array {
        $result = [];
        $currentChunk = $chunks[0];

        foreach ($similarities as $comparison) {
            $from = $comparison['from'];
            $to = $comparison['to'];
            $similarity = $comparison['similarity'];

            if ($similarity >= $threshold) {
                // Combine the next text with the current group
                $currentChunk .= "\n\n".$chunks[$to];
            } else {
                // Finish the current group
                $result[] = $currentChunk;

                // Start a new group
                $currentChunk = $chunks[$to];
            }
        }

        $result[] = $currentChunk;

        return $result;
    }
}
