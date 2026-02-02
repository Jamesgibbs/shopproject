<?php

declare(strict_types=1);

namespace App\Contracts;

use Symfony\Component\HttpFoundation\File\UploadedFile;

interface ImporterInterface
{
    /**
     * @return array{successCount: int, errorCount: int, errors: string[]}
     */
    public function import(UploadedFile $file): array;
}
