import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Index from "@/Pages/Orders/Index.jsx";
import {Link, router, usePage} from "@inertiajs/react";

export default function SalesHistory() {
    const { sales = [] } = usePage().props;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Sales History</h1>
            <table className="w-full max-w-7xl table-auto border border-gray-200 text-center">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 border-b">Product Name</th>
                    <th className="px-4 py-2 border-b">Customer Name</th>
                    <th className="px-4 py-2 border-b">Quantity</th>
                    <th className="px-4 py-2 border-b">Total Price</th>
                    <th className="px-4 py-2 border-b">Order Date</th>
                </tr>
                </thead>
                <tbody>
                {sales.map((sale, index) => (
                    <tr key={index}>
                        <td className="px-4 py-2 border-b">{sale.product_name}</td>
                        <td className="px-4 py-2 border-b">{sale.customer_name}</td>
                        <td className="px-4 py-2 border-b">{sale.quantity}</td>
                        <td className="px-4 py-2 border-b">£{sale.price}</td>
                        <td className="px-4 py-2 border-b">{sale.ordered_at}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
}

SalesHistory.layout = page => <AuthenticatedLayout children={page} />;
