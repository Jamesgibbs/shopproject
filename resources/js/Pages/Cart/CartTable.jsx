import React from 'react';
import { router } from '@inertiajs/react';
import Pagination from "@/Components/Pagination/Pagination.jsx";

export default function CartTable({ cartItems }) {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    const handleQuantityChange = (itemId, newQuantity, productId) => {
        router.post(route('cart.updateQuantity'), {
            cart_item_id: itemId,
            quantity: newQuantity,
            product_id: productId || 0,
        });
    };

    const handleRemove = (itemId) => {
        router.post(route('cart.remove'), {
            id: itemId
        });
    };

    const headers = ['Product', 'Price', 'Quantity', 'Total', 'Actions'];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="table-header">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                    <tr key={item.id}>
                        <td className="data-table tbody td">{item.name}</td>
                        <td className="data-table tbody td">£{item.price}</td>
                        <td className="data-table tbody td">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.product_id)}
                                    disabled={item.quantity <= 1}
                                    className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100
                                                 rounded hover:bg-gray-200 disabled:opacity-50
                                                 disabled:cursor-not-allowed"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.product_id)}
                                    className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100
                                                 rounded hover:bg-gray-200"
                                >
                                    +
                                </button>
                            </div>
                        </td>
                        <td className="data-table tbody td">
                            £{(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="data-table tbody tdp">
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="text-red-600 hover:text-red-900"
                            >
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination links={cartItems.links} />
        </div>
    );
}
