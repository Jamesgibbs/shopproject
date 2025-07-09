import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function CartTable({ cartItems }) {

    const { delete: removeProduct } = useForm();

    console.log(cartItems);

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return <p>Cart is empty.</p>;
    }

    const handleRemoveFromCart = (id) => {
        removeProduct(`/products/${id}`);
    };

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
            <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {cartItems.map(item => (
                <tr key={item.id}>
                    <td style={tdStyle}>{item.name}</td>
                    <td style={tdStyle}>£{item.price}</td>
                    <td style={tdStyle}>{item.stock_quantity}</td>
                    <td style={tdStyle}>
                        <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            style={deleteButtonStyle}
                        >
                            Remove From Cart
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
