<?php

declare(strict_types=1);

namespace App\Contracts;

interface FileParserInterface
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function parse(string $path): array;

    /**
     * @return string[]
     */
    public function getErrors(): array;
}
