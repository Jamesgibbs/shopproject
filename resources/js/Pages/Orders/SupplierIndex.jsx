import React from 'react'
import { usePage } from '@inertiajs/react'
import OrdersTable from './OrdersTable.jsx'
import PageCard from '@/Components/Common/PageCard.jsx'
import SupplierLayout from "@/Layouts/SupplierLayout.tsx";

export default function SupplierIndex() {
    const { orders } = usePage().props

    return (
        <PageCard title="Orders">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Orders</h1>

            <OrdersTable orders={orders.data} />
        </PageCard>
    )
}

SupplierIndex.layout = (page) => <SupplierLayout children={page} />
