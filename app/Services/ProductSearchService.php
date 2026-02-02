<?php

declare(strict_types=1);

namespace App\Services;

use App\DataTransferObjects\ProductData;
use App\Models\Product;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductSearchService
{
    public function search(?string $query): LengthAwarePaginator|AbstractPaginator|null
    {
        if (! $query) {
            return null;
        }

        return Product::with('supplier')
            ->where(fn ($q) => $q->where('name', 'like', "%{$query}%")
                ->orWhere('description', 'like', "%{$query}%")
            )
            ->latest()
            ->paginate(12)
            ->withQueryString()
            ->through(fn ($p) => ProductData::fromModel($p)->toArray());
    }

    public function featured()
    {
        return Product::featured()
            ->latest()
            ->take(8)
            ->get()
            ->map(fn ($p) => ProductData::fromModel($p)->toArray());
    }
}
