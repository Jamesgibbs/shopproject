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
        public ?string $productImage,
        public int $productId,
        public int $quantity,
        public string $price,
        public int $orderId,
        public string $totalAmount,
        public string $orderedAt,
        public string $status
    ) {}

    public static function fromModel(OrderItem $item): self
    {
        return new self(
            id: $item->id,
            customerName: $item->order->user->name,
            productName: $item->product->name,
            productImage: $item->product->image,
            productId: $item->product->id,
            quantity: $item->quantity,
            price: (string) $item->price_at_time,
            orderId: $item->order->id,
            totalAmount: (string) $item->order->total_amount,
            orderedAt: $item->order->created_at->toDateTimeString(),
            status: $item->order->status,
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
            'product_image' => $this->productImage,
            'product_id' => $this->productId,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'order_id' => $this->orderId,
            'total_amount' => $this->totalAmount,
            'ordered_at' => $this->orderedAt,
            'status' => $this->status,
        ];
    }
}
