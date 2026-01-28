<?php

declare(strict_types=1);

namespace App\DataTransferObjects;

use App\Models\OrderItem;

readonly class SalesHistoryData
{
    public function __construct(
        public int $id,
        public string $customerName,
        public string $productName,
        public int $quantity,
        public float $price,
        public int $orderId,
        public string $orderedAt,
    ) {}

    public static function fromModel(OrderItem $item): self
    {
        return new self(
            id: $item->id,
            customerName: $item->order->user->name,
            productName: $item->product->name,
            quantity: $item->quantity,
            price: $item->price_at_time,
            orderId: $item->order->id,
            orderedAt: $item->order->created_at->toDateTimeString(),
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'customer_name' => $this->customerName,
            'product_name' => $this->productName,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'order_id' => $this->orderId,
            'ordered_at' => $this->orderedAt,
        ];
    }
}
