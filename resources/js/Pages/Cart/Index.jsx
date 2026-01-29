import React, { useState } from 'react'
import { usePage } from '@inertiajs/react'
import CartTable from './CartTable.jsx'
import GuestLayout from "@/Layouts/GuestLayout.tsx";
import SupplierLayout from "@/Layouts/SupplierLayout.tsx";

export function Index({ auth }) {
    const { products = [] } = usePage().props
    const [showForm, setShowForm] = useState(false)

    const Layout = auth?.user ? SupplierLayout : GuestLayout

    const toggleForm = () => setShowForm((prev) => !prev)

    return (
        <Layout>
            <div className="flex flex-col items-center p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Shopping Cart</h1>

                <button onClick={toggleForm} className="btn btn-primary mb-4">
                    {showForm ? 'Cancel' : 'Add To Cart'}
                </button>

                <CartTable products={products} />
            </div>
        </Layout>
    )
}

