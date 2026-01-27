<?php

namespace Tests\Feature;

use App\Enums\Role;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaymentControllerTest extends TestCase
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
            ->has('products.data', 3)  // Check the paginated data array
        );

    }



}
