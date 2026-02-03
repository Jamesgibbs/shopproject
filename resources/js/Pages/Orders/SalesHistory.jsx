import React from 'react'
import { usePage, Link } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import PageCard from '@/Components/Common/PageCard.jsx'

export default function SalesHistory() {
    const { sales = [] } = usePage().props

    return (
        <PageCard title="Sales History">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sales.map((sale) => (
                            <tr key={sale.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={`/orders/${sale.order_id}`} className="text-indigo-600 hover:text-indigo-900">
                                        #{sale.order_id}
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {sale.customer_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {sale.product_image && (
                                            <img
                                                src={sale.product_image}
                                                alt={sale.product_name}
                                                className="h-10 w-10 rounded-full mr-3 object-cover"
                                            />
                                        )}
                                        <Link href={`/products/${sale.product_id}`} className="text-indigo-600 hover:text-indigo-900">
                                            {sale.product_name}
                                        </Link>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{sale.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap">£{sale.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">£{sale.total_amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {new Date(sale.ordered_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap capitalize">
                                    {sale.status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={`/orders/${sale.order_id}`} className="text-indigo-600 hover:text-indigo-900">
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </PageCard>
    )
}

SalesHistory.layout = (page) => <AppLayout children={page} />
