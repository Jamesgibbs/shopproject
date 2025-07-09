import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AddToCartButton from "@/Pages/Cart/AddToCartButton.jsx";
import { router } from '@inertiajs/react'

export default function ProductsTable({ products }) {

    const { delete: removeProduct } = useForm();

    if (!products || products.length === 0) {
        return <p>No products available.</p>;
    }

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            removeProduct(`/products/${id}`);
        }
    };

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
            <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Actions</th>
                <th style={thStyle}>Delete</th>
            </tr>
            </thead>
            <tbody>
            {products.map(product => (
                <tr key={product.id}>
                    <td
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                        onClick={() => router.visit(`/products/${product.id}`)}
                    >
                        {product.name}
                    </td>
                    <td style={tdStyle}>£{product.price}</td>
                    <td style={tdStyle}>{product.stock_quantity}</td>
                    <td style={tdStyle}>
                        <Link href={`/products/${product.id}/edit`} style={linkStyle}>
                            Edit
                        </Link>
                    </td>
                    <td style={tdStyle}>
                        <button
                            onClick={() => handleDelete(product.id)}
                            style={deleteButtonStyle}
                        >
                            Delete
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

