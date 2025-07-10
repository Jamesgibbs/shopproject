import React from 'react';
import { Link } from '@inertiajs/react';

export default function OrdersTable({ orders }) {

    if (!Array.isArray(orders) || orders.length === 0) {
        return <p></p>;
    }

    return (
        <div>

        <table className="w-full max-w-7xl table-auto border border-gray-200 text-center">
            <thead>
            <tr>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Status</th>
            </tr>
            </thead>
            <tbody>
            {orders.map(order => (
                <tr key={order.id}>
                    <td style={tdStyle}>£{order.total}</td>
                    <td style={tdStyle}>
                        <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                            {order.items.map(item => (
                                <li key={item.id}>
                                    {item.name} × {item.quantity} — £{item.price}
                                </li>
                            ))}
                        </ul>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

        </div>
    );
}

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
