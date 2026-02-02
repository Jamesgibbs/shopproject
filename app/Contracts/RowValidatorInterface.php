<?php

declare(strict_types=1);

namespace App\Contracts;

interface RowValidatorInterface
{
    /**
     * @param  array<string, mixed>  $row
     * @return string[] Empty array if valid, otherwise list of error messages.
     */
    public function validate(array $row): array;
}
