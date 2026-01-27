<?php

namespace App\ValueObjects;

use InvalidArgumentException;

class OrderId
{
    public function __construct(public readonly int $value)
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
