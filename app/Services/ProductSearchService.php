<?php

declare(strict_types=1);

namespace App\Services;

use App\DataTransferObjects\ProductData;
use App\Models\Product;

class ProductSearchService
{
    /**
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator<int, array<string, mixed>>|null
     */
    public function search(?string $query): ?\Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        if (! $query) {
            return null;
        }

        /** @var \Illuminate\Pagination\LengthAwarePaginator<int, Product> $paginator */
        $paginator = Product::with('supplier')
            ->where(fn ($q) => $q->where('name', 'like', "%{$query}%")
                ->orWhere('description', 'like', "%{$query}%")
            )
            ->latest()
            ->paginate(12);

        /** @var \Illuminate\Contracts\Pagination\LengthAwarePaginator<int, array<string, mixed>> $result */
        $result = $paginator->withQueryString()
            ->through(fn ($p) => ProductData::fromModel($p)->toArray());

        return $result;
    }

    /**
     * @return \Illuminate\Support\Collection<int, array<string, mixed>>
     */
    public function featured(): \Illuminate\Support\Collection
    {
        return Product::featured()
            ->latest()
            ->take(8)
            ->get()
            ->map(fn ($p) => ProductData::fromModel($p)->toArray());
    }

    /**
     * @return \Illuminate\Support\Collection<int, array<string, mixed>>
     */
    public function deals(): \Illuminate\Support\Collection
    {
        return Product::deals()
            ->latest()
            ->take(8)
            ->get()
            ->map(fn ($p) => ProductData::fromModel($p)->toArray());
    }
}
