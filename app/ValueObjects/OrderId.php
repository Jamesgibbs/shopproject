<?php

declare(strict_types=1);

namespace App\ValueObjects;

use InvalidArgumentException;

readonly class OrderId
{
    public function __construct(public int $value)
    {
        if ($this->value <= 0) {
            throw new InvalidArgumentException('Order ID must be a positive integer.');
        }
    }

    public function __toString(): string
    {
        return (string) $this->value;
    }
}
