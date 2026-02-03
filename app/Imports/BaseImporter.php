<?php

declare(strict_types=1);

namespace App\Imports;

use App\Contracts\FileParserInterface;
use App\Contracts\ImporterInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Throwable;

abstract class BaseImporter implements ImporterInterface
{
    protected int $successCount = 0;

    protected int $errorCount = 0;

    /**
     * @var array<int, string>
     */
    protected array $errors = [];

    public function __construct(
        protected FileParserInterface $parser,
        protected LoggerInterface $logger
    ) {}

    /**
     * @return array{successCount: int, errorCount: int, errors: array<int, string>}
     */
    public function import(UploadedFile $file): array
    {
        $this->successCount = 0;
        $this->errorCount = 0;
        $this->errors = [];

        $data = $this->parser->parse($file->getRealPath());
        $parsingErrors = $this->parser->getErrors();

        if (! empty($parsingErrors)) {
            $this->errors = array_merge($this->errors, $parsingErrors);
            // If we have critical parsing errors (like missing columns), we might want to stop
            // For now, we'll assume the parser returns whatever it could parse.
            // If it returns empty data but has errors, it's effectively a failure.
            if (empty($data)) {
                return $this->getResult();
            }
        }

        foreach ($data as $index => $row) {
            try {
                $this->processRow($row, $index);
            } catch (Throwable $e) {
                $this->logger->error('Import failed for row '.($index + 2), [
                    'exception' => $e,
                    'row' => $row,
                ]);
                $this->errorCount++;
                $this->errors[] = 'Row '.($index + 2).': Internal error.';
            }
        }

        return $this->getResult();
    }

    /**
     * @param array<string, mixed> $row
     */
    abstract protected function processRow(array $row, int $index): void;

    /**
     * @return array{successCount: int, errorCount: int, errors: array<int, string>}
     */
    protected function getResult(): array
    {
        return [
            'successCount' => $this->successCount,
            'errorCount' => $this->errorCount,
            'errors' => $this->errors,
        ];
    }
}
