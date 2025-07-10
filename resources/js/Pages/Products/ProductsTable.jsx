import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AddToCartButton from "@/Pages/Cart/AddToCartButton.jsx";
import { router } from '@inertiajs/react'

export default function ProductsTable({ products, user }) {

    const { delete: removeProduct } = useForm();
    const isSupplier = user && user.role === 'supplier';

    if (!products || products.length === 0) {
        return <p>No products available.</p>;
    }

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            removeProduct(`/products/${id}`);
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <table className="w-full max-w-7xl table-auto border border-gray-200 text-center">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 border-b">Name</th>
                    <th className="px-4 py-2 border-b">Price</th>
                    <th className="px-4 py-2 border-b">Quantity</th>
                    {isSupplier && <th className="px-4 py-2 border-b">Edit</th>}
                    {isSupplier && <th className="px-4 py-2 border-b">Delete</th>}
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td className="px-4 py-2 border-b text-blue-600 underline cursor-pointer" onClick={() => router.visit(`/products/${product.id}`)}>
                            {product.name}
                        </td>
                        <td className="px-4 py-2 border-b">£{product.price}</td>
                        <td className="px-4 py-2 border-b">{product.stock_quantity}</td>
                        {isSupplier && (
                            <td className="px-4 py-2 border-b">
                                <Link href={`/products/edit-product/${product.id}`} className="text-blue-500 hover:underline">Edit</Link>
                            </td>
                        )}
                        {isSupplier && (
                            <td className="px-4 py-2 border-b">
                                <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:underline">Delete</button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
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

