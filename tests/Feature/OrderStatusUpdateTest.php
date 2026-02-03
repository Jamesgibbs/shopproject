<?php

namespace Tests\Feature;

use App\Enums\Role;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderStatusUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_supplier_can_update_order_status()
    {
        $supplier = User::factory()->create(['role' => Role::SUPPLIER->value]);
        $order = Order::factory()->create([
            'supplier_id' => $supplier->id,
            'status' => 'pending'
        ]);

        $this->actingAs($supplier);

        $response = $this->patch(route('orders.updateStatus', $order), [
            'status' => 'shipped'
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'status' => 'shipped'
        ]);
    }

    public function test_supplier_cannot_update_others_order_status()
    {
        $supplier1 = User::factory()->create(['role' => Role::SUPPLIER->value]);
        $supplier2 = User::factory()->create(['role' => Role::SUPPLIER->value]);
        $order = Order::factory()->create([
            'supplier_id' => $supplier1->id,
            'status' => 'pending'
        ]);

        $this->actingAs($supplier2);

        $response = $this->patch(route('orders.updateStatus', $order), [
            'status' => 'shipped'
        ]);

        $response->assertForbidden();
    }
}
