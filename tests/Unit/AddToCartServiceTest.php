<?php

namespace Tests\Unit;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use App\Services\AddToCartService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddToCartServiceTest extends TestCase
{
    use RefreshDatabase;

    private AddToCartService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new AddToCartService;
    }

    public function test_it_creates_a_new_cart_if_none_exists()
    {
        $user = User::factory()->create();
        $product = Product::factory()->create(['price' => 100]);

        $this->service->add($product->id, 1, $user->id);

        $this->assertDatabaseHas('carts', [
            'user_id' => $user->id,
        ]);
        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 1,
            'price_at_time' => 100,
        ]);
    }

    public function test_it_uses_existing_cart()
    {
        $user = User::factory()->create();
        $cart = Cart::factory()->create(['user_id' => $user->id]);
        $product = Product::factory()->create();

        $this->service->add($product->id, 1, $user->id);

        $this->assertEquals(1, Cart::count());
        $this->assertDatabaseHas('cart_items', [
            'cart_id' => $cart->id,
            'product_id' => $product->id,
        ]);
    }

    public function test_it_increments_quantity_if_item_already_in_cart()
    {
        $user = User::factory()->create();
        $cart = Cart::factory()->create(['user_id' => $user->id]);
        $product = Product::factory()->create();

        $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 2,
            'price_at_time' => $product->price,
        ]);

        $this->service->add($product->id, 3, $user->id);

        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 5,
        ]);
    }

    public function test_it_throws_exception_if_product_not_found()
    {
        $user = User::factory()->create();

        $this->expectException(\Illuminate\Database\Eloquent\ModelNotFoundException::class);

        $this->service->add(999, 1, $user->id);
    }
}
