<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Models\Product;

readonly class ProductData
{
    public function __construct(
        protected int $id,
        protected string $name,
        protected string $description,
        protected string $price,
        protected int $stockQuantity,
        protected ?int $supplierId = null,
        protected ?string $supplierName = null,
        protected ?float $averageRating = null,
        protected ?int $reviewsCount = null,
        protected ?string $image = null,
        protected array $reviews = [],
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
            averageRating: $product->average_rating !== null
                ? floatval($product->average_rating)
                : null,
            reviewsCount: $product->reviews_count,
            image: $product->image ?? null,
            reviews: $product->relationLoaded('reviews') ? $product->reviews->toArray() : [],
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
        ];
    }
}
