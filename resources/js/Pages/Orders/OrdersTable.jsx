import React from 'react'

export default function OrdersTable({ orders }) {
    if (!Array.isArray(orders) || orders.length === 0) {
        return <p>No Previous Orders</p>
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="table-header">Total</th>
                        <th className="table-header">Items</th>
                        <th className="table-header">Date</th>
                        <th className="table-header">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap">£{order.total}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <ul className="m-0 pl-4">
                                    {order.items.map((item) => (
                                        <li key={item.id}>
                                            {item.name} × {item.quantity} — £{item.price}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.ordered_at}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
