import React from 'react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {usePage} from "@inertiajs/react";
import OrdersTable from "./OrdersTable.jsx";
export default function Index() {

    const { previousOrders = [], pendingOrders = [] } = usePage().props;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                My Orders
            </h1>

            <h2>Pending Orders</h2>
            <OrdersTable orders={pendingOrders} />

            <h2 style={{ marginTop: '3rem' }}>Previous Orders</h2>
            <OrdersTable orders={previousOrders} />
        </div>
    );
}

Index.layout = page => <AuthenticatedLayout children={page} />;
