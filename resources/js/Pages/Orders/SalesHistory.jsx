import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import PageCard from "@/Components/PageCard.jsx";

export default function SalesHistory() {
    const { sales = [] } = usePage().props;

    return (
        <PageCard title="Sales History">

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="table-header">Order ID</th>
                        <th className="table-header">Customer</th>
                        <th className="table-header">Product</th>
                        <th className="table-header">Quantity</th>
                        <th className="table-header">Price</th>
                        <th className="table-header">Date</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{sale.order_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{sale.customer_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{sale.product_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{sale.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${sale.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(sale.ordered_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </PageCard>
    );
}

SalesHistory.layout = page => <AuthenticatedLayout children={page} />;
