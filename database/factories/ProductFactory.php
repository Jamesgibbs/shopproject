<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
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
            'supplier_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
            'description' => $this->faker->words(5, true),
            'stock_quantity' => $this->faker->numberBetween(1, 100),
        ];
    }
}
