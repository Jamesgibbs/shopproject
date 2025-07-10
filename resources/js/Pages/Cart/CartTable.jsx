import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';

export default function CartTable({ cartItems }) {

    const { post: removeProduct } = useForm();

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return <p>Cart is empty.</p>;
    }


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
            {cartItems.map(item => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.stock_quantity}</td>
                    <td>
                        <button onClick={() => handleRemoveFromCart(item.id)}>
                            Remove from Cart
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

    );
}

// Optional inline styles for simplicity
const thStyle = {
    borderBottom: '2px solid #ccc',
    textAlign: 'left',
    padding: '8px',
};

const tdStyle = {
    borderBottom: '1px solid #eee',
    padding: '8px',
};

const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
};

const deleteButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
    textDecoration: 'underline',
};
