<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Models\CartItem;

readonly class CartItemData
{
    public function __construct(
        protected int $id,
        protected int $productId,
        protected string $name,
        protected string $price,
        protected int $quantity,
        public ?string $image = null,
    ) {}

    public static function fromModel(CartItem $item): self
    {
        return new self(
            id: $item->id,
            productId: $item->product->id,
            name: $item->product->name,
            price: (string) $item->product->price,
            quantity: $item->quantity,
            image: $item->product->images->first()?->path,
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->productId,
            'name' => $this->name,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'image' => $this->image,
        ];
    }
}
