import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';

export default function CartTable({ cartItems, onUpdateQuantity, onRemoveItem }) {
    const [editingItemId, setEditingItemId] = useState(null);
    const [editValue, setEditValue] = useState('');


    const handleRemoveFromCart = (id) => {
        router.post(route('cart.remove'), { id })
    }

    return (
        <table className="w-full max-w-screen-xl mx-auto table-auto border border-gray-200 text-center">
            <thead className="bg-gray-100">
            <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Price</th>
                <th className="px-4 py-2 border-b">Quantity</th>
                <th className="px-4 py-2 border-b">Actions</th>
            </tr>
            </thead>
            <tbody>
            {cartItems.map((item) => (
                <tr key={item.id}>
                    <td className="px-4 py-2 border-b">{item.name}</td>
                    <td className="px-4 py-2 border-b">£{item.price}</td>
                    <td className="px-4 py-2 border-b">
                       {item.stock_quantity}
                    </td>
                    <td className="px-4 py-2 border-b">
                        <button onClick={() => handleRemoveFromCart(item.id)}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
                        >
                            Remove from Cart
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
