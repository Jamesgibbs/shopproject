<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items.product')
            ->where('user_id', auth()->id())
            ->get();


        $pendingOrders = $orders->filter(fn($order) => $order->status === 'pending')->values();
        $otherOrders = $orders->filter(fn($order) => $order->status !== 'pending')->values();

        return Inertia::render('Orders/Index', [
            'pendingOrders' => $pendingOrders->map(fn($order) => $this->transformOrder($order)),
            'previousOrders' => $otherOrders->map(fn($order) => $this->transformOrder($order)),
        ]);
    }

    private function transformOrder($order): array
    {
        return [
            'id' => $order->id,
            'customer_name' => $order?->user?->name,
            'total' => $order->total_amount,
            'status' => $order->status,
            'items' => $order->items->map(fn($item) => [
                'id' => $item->id,
                'name' => $item->product->name ?? 'Unknown Product',
                'quantity' => $item->quantity,
                'price' => $item->price_at_time,
            ]),
            'ordered_at' => $order->created_at->toDateTimeString(),
        ];
    }

    public function submit(Request $request)
    {
        try {
            $cart = Cart::where('user_id', $request->user()->id);

            Order::create([
                'user_id' => $request->user()->id,
                'cart_id' => $cart->id,
                'status' => 'pending',
                'total_amount' => $cart->total,
            ]);

        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Error creating Order!');
        }

        return redirect()->back()->with('success', 'Order Submitted!');
    }

    public function salesHistory()
    {
        $supplierId = auth()->id();

        $sales = OrderItem::with(['order.user', 'product'])
            ->whereHas('product', fn($q) => $q->where('supplier_id', $supplierId))
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'customer_name' => $item->order?->user?->name ?? '',
                    'product_name' => $item->product->name,
                    'quantity' => $item->quantity,
                    'price' => $item->price_at_time,
                    'order_id' => $item->order->id,
                    'ordered_at' => $item->order->created_at->toDateTimeString(),
                ];
            });

        return Inertia::render('Orders/SalesHistory', [
            'sales' => $sales,
        ]);
    }

}
