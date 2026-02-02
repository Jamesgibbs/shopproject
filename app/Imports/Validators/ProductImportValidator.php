<?php

declare(strict_types=1);

namespace App\Imports\Validators;

use App\Contracts\RowValidatorInterface;
use Illuminate\Support\Facades\Validator;

class ProductImportValidator implements RowValidatorInterface
{
    public function validate(array $row): array
    {
        $validator = Validator::make($row, [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
        ]);

        return $validator->fails() ? $validator->errors()->all() : [];
    }
}
