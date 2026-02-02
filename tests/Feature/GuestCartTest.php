<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use App\Enums\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GuestCartTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_add_to_cart_and_cart_token_is_stored()
    {
        $product = Product::factory()->create(['stock_quantity' => 10]);

        $response = $this->post(route('cart.add'), [
            'product_id' => $product->id,
        ]);

        $response->assertRedirect();
        $cartToken = session()->get('cart_token');
        $this->assertNotNull($cartToken);

        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'cart_token' => $cartToken,
            'user_id' => null,
        ]);
    }

    public function test_user_can_add_to_cart_and_user_id_is_stored()
    {
        $user = User::factory()->create(['role' => Role::CUSTOMER->value]);
        $this->actingAs($user);
        $product = Product::factory()->create(['stock_quantity' => 10]);

        $response = $this->post(route('cart.add'), [
            'product_id' => $product->id,
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'user_id' => $user->id,
            'cart_token' => null,
        ]);
    }
}
