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
        $response->assertInertia(fn ($page) => $page->component('Products/Index')
            ->has('products.data', 3)  // Check the paginated data array
        );

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
        $response->assertInertia(fn ($page) => $page->component('Products/Edit')
            ->has('product')
        );
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
