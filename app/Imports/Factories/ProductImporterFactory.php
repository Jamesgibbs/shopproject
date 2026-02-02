<?php

declare(strict_types=1);

namespace App\Imports\Factories;

use App\Imports\Parsers\CsvParser;
use App\Imports\Processors\ProductImportProcessor;
use App\Imports\ProductImporter;
use App\Imports\Validators\ProductImportValidator;
use Psr\Log\LoggerInterface;

class ProductImporterFactory
{
    public function __construct(
        protected LoggerInterface $logger
    ) {}

    public function createCsvImporter(): ProductImporter
    {
        $parser = new CsvParser(['name', 'description', 'price', 'stock_quantity']);
        $validator = new ProductImportValidator;
        $processor = new ProductImportProcessor;

        return new ProductImporter($parser, $validator, $processor, $this->logger);
    }
}
