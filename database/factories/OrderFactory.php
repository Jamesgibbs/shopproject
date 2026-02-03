<?php

namespace Database\Factories;

use App\Enums\Role;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'total_amount' => $this->faker->randomFloat(2, 10, 1000),
            'billing_name' => $this->faker->name(),
            'billing_address' => $this->faker->address(),
            'email_address' => $this->faker->safeEmail(),
            'phone_number' => $this->faker->phoneNumber(),
            'status' => $this->faker->randomElement(['pending', 'paid', 'shipped', 'cancelled']),
            'supplier_id' => User::where('role', Role::SUPPLIER->value)->inRandomOrder()->first()?->id,
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
