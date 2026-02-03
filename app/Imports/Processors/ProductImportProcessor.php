<?php

declare(strict_types=1);

namespace App\Imports\Processors;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ProductImportProcessor
{
    /**
     * @param  array<string, mixed>  $row
     */
    public function process(array $row): void
    {
        Product::create([
            'name' => $row['name'],
            'description' => $row['description'] ?? '',
            'price' => $row['price'],
            'stock_quantity' => $row['stock_quantity'],
            'supplier_id' => Auth::id(),
        ]);
    }
}
