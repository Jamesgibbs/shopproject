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
        ];
    }
}
