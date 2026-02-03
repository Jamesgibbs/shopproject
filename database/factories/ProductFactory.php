<?php

namespace Database\Factories;

use App\Enums\Role;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(2, true),
            'price' => $this->faker->randomFloat(2, 5, 500),
            'supplier_id' => User::where('role', Role::SUPPLIER->value)->inRandomOrder()->first()?->id ?? User::factory(),
            'description' => $this->faker->words(5, true),
            'stock_quantity' => $this->faker->numberBetween(1, 100),
            'image' => "https://picsum.photos/seed/product-{$this->faker->unique()->numberBetween(1, 9999)}/600/300",
            'is_featured' => false,
            'is_deal' => false,
            'deal_price' => null,
            'deal_expires_at' => null,
            'sku' => $this->faker->unique()->bothify('SKU-#####'),
        ];
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    public function deal(?float $dealPrice = null): static
    {
        return $this->state(fn (array $attributes) => [
            'is_deal' => true,
            'deal_price' => $dealPrice ?? round($attributes['price'] * 0.8, 2),
            'deal_expires_at' => now()->addDays(7),
        ]);
    }
}
