<?php

namespace Tests\Feature;

use App\Enums\Role;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CartControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_view_cart()
    {
        $response = $this->get(route('cart.view'));
        $response->assertStatus(200);
    }

    public function test_user_can_view_empty_cart()
    {
        $user = User::factory()->create(['role' => Role::CUSTOMER->value]);
        $this->actingAs($user);

        $response = $this->get(route('cart.view'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Cart/ViewCart')
            ->has('cartItems', 0)
        );
    }

    public function test_user_can_view_cart_with_items()
    {
        $user = User::factory()->create(['role' => Role::CUSTOMER->value]);
        $this->actingAs($user);

        $cart = Cart::factory()->create(['user_id' => $user->id]);
        $product = Product::factory()->create();

        $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 2,
            'price_at_time' => $product->price,
        ]);

        $response = $this->get(route('cart.view'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Cart/ViewCart')
            ->has('cartItems', 1)
            ->where('cartItems.0.product_id', $product->id)
            ->where('cartItems.0.quantity', 2)
        );
    }

    public function test_user_can_add_to_cart()
    {
        $user = User::factory()->create(['role' => Role::CUSTOMER->value]);
        $this->actingAs($user);

        $product = Product::factory()->create(['stock_quantity' => 10]);

        $response = $this->post(route('cart.add'), [
            'product_id' => $product->id,
            'quantity' => 1,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Product added to cart!');

        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 1,
        ]);
    }

    public function test_user_can_remove_from_cart()
    {
        $user = User::factory()->create(['role' => Role::CUSTOMER->value]);
        $this->actingAs($user);

        $cart = Cart::factory()->create(['user_id' => $user->id]);
        $product = Product::factory()->create();
        $cartItem = $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 1,
            'price_at_time' => $product->price,
        ]);

        $response = $this->post(route('cart.remove'), [
            'id' => $cartItem->id,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Product removed from cart!');

        $this->assertDatabaseMissing('cart_items', ['id' => $cartItem->id]);
    }

    public function test_user_can_update_quantity()
    {
        $user = User::factory()->create(['role' => Role::CUSTOMER->value]);
        $this->actingAs($user);

        $cart = Cart::factory()->create(['user_id' => $user->id]);
        $product = Product::factory()->create(['stock_quantity' => 10]);
        $cartItem = $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 1,
            'price_at_time' => $product->price,
        ]);

        $response = $this->post(route('cart.updateQuantity'), [
            'cart_item_id' => $cartItem->id,
            'product_id' => $product->id,
            'quantity' => 5,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Quantity updated!');

        $this->assertDatabaseHas('cart_items', [
            'id' => $cartItem->id,
            'quantity' => 5,
        ]);
    }

    public function test_cannot_update_quantity_beyond_stock()
    {
        $user = User::factory()->create(['role' => Role::CUSTOMER->value]);
        $this->actingAs($user);

        $cart = Cart::factory()->create(['user_id' => $user->id]);
        $product = Product::factory()->create(['stock_quantity' => 5]);
        $cartItem = $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 1,
            'price_at_time' => $product->price,
        ]);

        $response = $this->post(route('cart.updateQuantity'), [
            'cart_item_id' => $cartItem->id,
            'product_id' => $product->id,
            'quantity' => 10,
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('error', 'No more stock available!');

        $this->assertDatabaseHas('cart_items', [
            'id' => $cartItem->id,
            'quantity' => 1,
        ]);
    }

    public function test_checkout_redirects_to_payment()
    {
        $user = User::factory()->create(['role' => Role::CUSTOMER->value]);
        $this->actingAs($user);

        $cart = Cart::factory()->create(['user_id' => $user->id]);
        $product = Product::factory()->create();
        $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 1,
            'price_at_time' => $product->price,
        ]);

        $response = $this->post(route('cart.checkout'));

        $response->assertRedirect(route('payment.form'));
    }

    public function test_cannot_checkout_empty_cart()
    {
        $user = User::factory()->create(['role' => Role::CUSTOMER->value]);
        $this->actingAs($user);

        $cart = Cart::factory()->create(['user_id' => $user->id]);

        $response = $this->post(route('cart.checkout'));

        $response->assertRedirect();
        $response->assertSessionHas('error', 'Your cart is empty.');
    }
}
