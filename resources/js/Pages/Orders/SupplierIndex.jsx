import React from 'react'
import { usePage } from '@inertiajs/react'
import OrdersTable from './OrdersTable.jsx'
import PageCard from '@/Components/PageCard.jsx'
import SupplierLayout from "@/Layouts/SupplierLayout.jsx";

export default function SupplierIndex() {
    const { previousOrders = [], pendingOrders = [] } = usePage().props

    return (
        <PageCard title="Orders">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">My Orders</h1>

            <h2>Pending Orders</h2>
            <OrdersTable orders={pendingOrders} />

            <h2 style={{ marginTop: '3rem' }}>Previous Orders</h2>
            <OrdersTable orders={previousOrders} />
        </PageCard>
    )
}

SupplierIndex.layout = (page) => <SupplierLayout children={page} />
