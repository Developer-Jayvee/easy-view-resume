<?php

namespace App\Http\Prompts\Templates;

class RagContextPrompt
{
    public static function build(
        string $question,
        string $context
    ): string {
        return <<<PROMPT
        User Question:
        {$question}

        Retrieved Document Context:
        {$context}

        Answer the user's question using the provided context.
        PROMPT;
    }
}
