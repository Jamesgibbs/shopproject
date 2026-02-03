<?php

declare(strict_types=1);

namespace App\Orders\DataTransferObjects;

use App\Models\OrderItem;

readonly class OrderItemData
{
    public function __construct(
        protected readonly int $id,
        protected readonly string $name,
        protected readonly int $quantity,
        protected readonly string $price,
    ) {}

    public static function fromModel(OrderItem $item): self
    {
        return new self(
            id: $item->id,
            name: $item->product->name ?? 'Unknown Product',
            quantity: $item->quantity,
            price: (string)$item->price_at_time,
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
            'quantity' => $this->quantity,
            'price' => $this->price,
        ];
    }
}
