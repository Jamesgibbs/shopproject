import React from 'react'
import { Link } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import PageCard from '@/Components/Common/PageCard.jsx'

export default function Show({ order }) {
    return (
        <PageCard title={`Order #${order.id} Details`}>
            <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">Order Information</h3>
                        <p className="text-gray-600">Ordered on: {new Date(order.ordered_at).toLocaleDateString()}</p>
                        <p className="text-gray-600">Status: <span className="capitalize">{order.status}</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-600">Customer: {order.customer_name}</p>
                        <p className="text-xl font-bold mt-1">Total: £{order.total}</p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-semibold mb-4">Items</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {order.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">£{item.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">£{(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8">
                    <Link
                        href="/orders/sales-history"
                        className="text-indigo-600 hover:text-indigo-900"
                    >
                        &larr; Back to Sales History
                    </Link>
                </div>
            </div>
        </PageCard>
    )
}

Show.layout = (page) => <AppLayout children={page} />
