<?php

namespace Tests\Feature;

use App\Enums\Role;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_sees_all_products()
    {
        $user = User::factory()->create(['role' => Role::CUSTOMER->value]);
        $this->actingAs($user);

        Product::factory()->count(3)->create();

        $response = $this->get(route('products.index'));
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
        $page->component('Products/Index')
            ->has('products', 3)
        );
    }

    public function test_supplier_sees_only_own_products()
    {
        $supplier = User::factory()->create();
        $this->actingAs($supplier);

        Product::factory()->count(2)->create(['supplier_id' => $supplier->id]);
        Product::factory()->create(); // different supplier

        $response = $this->get(route('products.index'));
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
        $page->component('Products/Index')
            ->has('products', 2)
        );
    }

    public function test_store_valid_product()
    {
        $supplier = User::factory()->create([
            'role' => Role::SUPPLIER->value,
        ]);

        $this->actingAs($supplier);

        $payload = [
            'name' => 'Test Product',
            'description' => 'A useful item',
            'price' => 99.99,
            'stock_quantity' => 10,
        ];

        $response = $this->post(route('products.store'), $payload);
        $response->assertRedirect();

        $this->assertDatabaseHas('products', [
            'name' => 'Test Product',
            'supplier_id' => $supplier->id,
        ]);
    }

    public function test_unauthorized_user_cannot_delete_product()
    {
        $supplier = User::factory()->create();
        $otherUser = User::factory()->create();

        $product = Product::factory()->create(['supplier_id' => $supplier->id]);

        $this->actingAs($otherUser);

        $response = $this->delete(route('products.delete', $product));
        $response->assertStatus(403);
    }

    public function test_supplier_can_delete_own_product()
    {
        $supplier = User::factory()->create([
            'role' => Role::SUPPLIER->value,
        ]);
        $this->actingAs($supplier);

        $product = Product::factory()->create(['supplier_id' => $supplier->id]);

        $response = $this->delete(route('products.delete', $product));
        $response->assertRedirect();
        $this->assertSoftDeleted('products', ['id' => $product->id]);
    }

    public function test_can_view_single_product()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $product = Product::factory()->create();
        Review::factory()->count(3)->create(['product_id' => $product->id]);

        $response = $this->get(route('products.view', $product));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
        $page->component('Products/Product')
            ->has('product.reviews')
            ->has('product.average_rating')
            ->has('product.reviews_count')
        );
    }

    public function test_supplier_can_create_product_form()
    {
        $supplier = User::factory()->create([
            'role' => Role::SUPPLIER->value,
        ]);
        $this->actingAs($supplier);

        $response = $this->get(route('products.create'));
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
        $page->component('Products/Create')
        );
    }

    public function test_store_product_validates_required_fields()
    {
        $supplier = User::factory()->create([
            'role' => Role::SUPPLIER->value,
        ]);
        $this->actingAs($supplier);

        $response = $this->post(route('products.store'), []);

        $response->assertSessionHasErrors(['name', 'price', 'stock_quantity']);
    }

    public function test_supplier_can_edit_product()
    {
        $supplier = User::factory()->create([
            'role' => Role::SUPPLIER->value,
        ]);
        $this->actingAs($supplier);

        $product = Product::factory()->create(['supplier_id' => $supplier->id]);

        $response = $this->get(route('products.edit', $product));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
        $page->component('Products/Edit')
            ->has('product')
        );
    }

    public function test_supplier_can_update_own_product()
    {
        $supplier = User::factory()->create([
            'role' => Role::SUPPLIER->value,
        ]);
        $this->actingAs($supplier);

        $product = Product::factory()->create(['supplier_id' => $supplier->id]);

        $updatedData = [
            'name' => 'Updated Product',
            'description' => 'Updated description',
            'price' => 199.99,
            'stock_quantity' => 20,
        ];

        $response = $this->put(route('products.update', $product), $updatedData);

        $response->assertRedirect();
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Updated Product',
            'price' => 199.99,
            'stock_quantity' => 20,
        ]);
    }

    public function test_product_update_validates_required_fields()
    {
        $supplier = User::factory()->create([
            'role' => Role::SUPPLIER->value,
        ]);
        $this->actingAs($supplier);

        $product = Product::factory()->create(['supplier_id' => $supplier->id]);

        $response = $this->put(route('products.update', $product), []);

        $response->assertSessionHasErrors(['name', 'price', 'stock_quantity']);
    }

    public function test_unauthorized_user_cannot_edit_product()
    {
        $supplier = User::factory()->create();
        $otherUser = User::factory()->create();

        $product = Product::factory()->create(['supplier_id' => $supplier->id]);

        $this->actingAs($otherUser);

        $response = $this->get(route('products.edit', $product));
        $response->assertStatus(403);
    }

}
