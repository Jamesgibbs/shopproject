<?php

declare(strict_types=1);

namespace App\Imports\Parsers;

use App\Contracts\FileParserInterface;

class CsvParser implements FileParserInterface
{
    /**
     * @var array<int, string>
     */
    private array $errors = [];

    /**
     * @param  string[]  $requiredColumns
     */
    public function __construct(private array $requiredColumns = []) {}

    public function parse(string $path): array
    {
        $this->errors = [];
        if (! file_exists($path)) {
            $this->errors[] = "File does not exist: {$path}";

            return [];
        }

        $data = array_map('str_getcsv', file($path));

        if (count($data) < 2) {
            $this->errors[] = 'The CSV file is empty or missing data.';

            return [];
        }

        $header = array_shift($data);
        $header = array_map('strtolower', array_map('trim', $header));

        foreach ($this->requiredColumns as $column) {
            if (! in_array(strtolower($column), $header)) {
                $this->errors[] = "Missing required column: {$column}";

                return [];
            }
        }

        $parsedData = [];
        foreach ($data as $index => $row) {
            if (count($header) !== count($row)) {
                $this->errors[] = 'Row '.($index + 2).': Column count mismatch.';

                continue;
            }

            $parsedData[] = array_combine($header, $row);
        }

        return $parsedData;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}
