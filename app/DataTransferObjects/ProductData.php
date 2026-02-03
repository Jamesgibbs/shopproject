<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Models\Product;
use Carbon\Carbon;

readonly class ProductData
{
    /**
     * @param array<int, mixed> $reviews
     */
    public function __construct(
        protected int $id,
        protected string $name,
        protected string $description,
        protected string $price,
        protected int $stockQuantity,
        protected ?int $supplierId,
        protected ?string $supplierName,
        protected ?float $averageRating,
        protected ?int $reviewsCount,
        protected ?string $image,
        protected array $reviews,
        protected Carbon $updatedAt,
        protected ?string $dealPrice = null,
    ) {}

    public static function fromModel(Product $product): self
    {
        return new self(
            id: $product->id,
            name: $product->name,
            description: $product->description,
            price: (string) $product->price,
            stockQuantity: $product->stock_quantity,
            supplierId: $product->relationLoaded('supplier') ? $product->supplier?->id : null,
            supplierName: $product->relationLoaded('supplier') ? $product->supplier?->name : null,
            averageRating: $product->average_rating > 0
                ? $product->average_rating
                : null,
            reviewsCount: $product->reviews_count,
            image: $product->image ?? null,
            reviews: $product->relationLoaded('reviews') ? $product->reviews->toArray() : [],
            updatedAt: Carbon::parse($product->updated_at),
            dealPrice: $product->deal_price !== null ? (string) $product->deal_price : null,
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'stock_quantity' => $this->stockQuantity,
            'supplier_id' => $this->supplierId,
            'supplier_name' => $this->supplierName,
            'average_rating' => $this->averageRating,
            'reviews_count' => $this->reviewsCount,
            'image' => $this->image,
            'reviews' => $this->reviews,
            'updated_at' => $this->updatedAt->toDateTimeString(),
            'deal_price' => $this->dealPrice,
        ];
    }
}
