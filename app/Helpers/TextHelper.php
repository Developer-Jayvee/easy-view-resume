<?php

namespace App\Helpers;

class TextHelper
{
    public static function chunkText(string $text, int $maxChars = 2500)
    {
        $chunks = [];
        $current = '';
        $paragraphs = explode("\n", $text);
        foreach ($paragraphs as $paragraph) {
            $candidate = $current === ''
                ? $paragraph
                : $current."\n\n".$paragraph;

            if (mb_strlen($candidate) > $maxChars && $current !== '') {
                $chunks[] = $current;
                $current = $paragraph;
            } else {
                $current = $candidate;
            }
        }

        if ($current !== '') {
            $chunks[] = $current;
        }

        return $chunks;
    }
}
