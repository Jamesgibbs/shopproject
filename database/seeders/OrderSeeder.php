<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = User::where('role', 'customer')->get();

        if ($customers->isEmpty()) {
            $customers = User::factory()->count(5)->create(['role' => 'customer']);
        }

        $products = Product::all();

        if ($products->isEmpty()) {
            return;
        }

        $customers->each(function ($customer) use ($products) {
            // Create 1-3 orders for each customer
            Order::factory()
                ->count(rand(1, 3))
                ->create(['user_id' => $customer->id])
                ->each(function ($order) use ($products) {
                    $orderTotal = 0;
                    $supplierId = null;

                    // Create 1-5 items for each order
                    $items = OrderItem::factory()
                        ->count(rand(1, 5))
                        ->make(['order_id' => $order->id]);

                    foreach ($items as $item) {
                        $product = $products->random();
                        $item->product_id = $product->id;
                        $item->price_at_time = $product->price;
                        $item->product_name = $product->name;
                        $item->save();

                        $orderTotal += $item->price_at_time * $item->quantity;

                        // Set the order's supplier_id to the supplier of the first product
                        if ($supplierId === null) {
                            $supplierId = $product->supplier_id;
                        }
                    }

                    $order->update([
                        'total_amount' => $orderTotal,
                        'supplier_id' => $supplierId,
                    ]);
                });
        });
    }
}
