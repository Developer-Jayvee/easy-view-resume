<?php
namespace App\Strategies;

use InvalidArgumentException;

class CosineSimilarityStrategy
{
    public function __invoke(array $a, array $b): float
    {
        if (count($a) !== count($b)) {
            throw new InvalidArgumentException(
                'Vectors must have the same dimensions.'
            );
        }

        $dotProduct = 0.0;
        $magnitudeA = 0.0;
        $magnitudeB = 0.0;

        foreach ($a as $i => $value) {
            $dotProduct += $value * $b[$i];

            $magnitudeA += $value * $value;
            $magnitudeB += $b[$i] * $b[$i];
        }

        $denominator = sqrt($magnitudeA) * sqrt($magnitudeB);

        if ($denominator == 0.0) {
            return 0.0;
        }

        return $dotProduct / $denominator;
    }
}
