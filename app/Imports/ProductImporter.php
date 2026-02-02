<?php

declare(strict_types=1);

namespace App\Imports;

use App\Contracts\FileParserInterface;
use App\Contracts\RowValidatorInterface;
use App\Imports\Processors\ProductImportProcessor;
use Psr\Log\LoggerInterface;

class ProductImporter extends BaseImporter
{
    public function __construct(
        FileParserInterface $parser,
        private readonly RowValidatorInterface $validator,
        private readonly ProductImportProcessor $processor,
        protected LoggerInterface $logger
    ) {
        parent::__construct($parser, $logger);
    }

    protected function processRow(array $row, int $index): void
    {
        $validationErrors = $this->validator->validate($row);

        if (! empty($validationErrors)) {
            $this->errorCount++;
            $this->errors[] = 'Row '.($index + 2).': '.implode(', ', $validationErrors);

            return;
        }

        $this->processor->process($row);

        $this->successCount++;
    }
}
