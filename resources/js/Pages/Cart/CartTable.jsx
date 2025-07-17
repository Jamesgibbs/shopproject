import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';

export default function CartTable({ cartItems = [] }) {
    if (!Array.isArray(cartItems)) {
        return <div>No items in cart</div>;
    }

    const handleRemoveFromCart = (id) => {
        router.post(route('cart.remove'), { id });
    }

    return (
        <div className="table-container">
            <table className="table-wrapper">
                <thead>
                <tr>
                    <th className="table-header">Product</th>
                    <th className="table-header">Quantity</th>
                    <th className="table-header">Price</th>
                    <th className="table-header">Actions</th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                    <tr key={item.id} className="table-row">
                        <td className="table-cell">{item.name || 'N/A'}</td>
                        <td className="table-cell">{item.stock_quantity || 0}</td>
                        <td className="table-cell">£{item.price || 0}</td>
                        <td className="table-cell">
                            <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
                            >
                                Remove from Cart
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
