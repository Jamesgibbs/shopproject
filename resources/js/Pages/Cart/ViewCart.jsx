import React from 'react'
import CartTable from './CartTable.jsx'
import { Link, router } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import GuestLayout from "@/Layouts/GuestLayout.tsx";
import SupplierLayout from "@/Layouts/SupplierLayout.tsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.tsx";

export default function ViewCart({ auth }) {
    const { cartItems = [] } = usePage().props
    const handleCheckout = () => {
        router.post(route('cart.checkout'))
    }

    let Layout;

    if (auth?.user && auth.user.role === 'customer') {
        Layout = AuthenticatedLayout;
    } else if (auth?.user && auth.user.role === 'supplier') {
        Layout = SupplierLayout;
    } else {
        Layout = GuestLayout;
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
                            </div>
                        </div>

                        <div className="p-6">
                            <CartTable cartItems={cartItems} />

                            <div className="mt-6">
                                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                                    <button
                                        onClick={handleCheckout}
                                        className="inline-flex items-center px-4 py-2
                                                 bg-blue-600 hover:bg-blue-700
                                                 text-sm font-medium text-white
                                                 rounded-md shadow-sm
                                                 focus:outline-none focus:ring-2
                                                 focus:ring-offset-2 focus:ring-blue-500
                                                 transition-all duration-200"
                                    >
                                        Continue To Checkout!
                                    </button>
                                ) : (
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center px-4 py-2
                                                 bg-blue-600 hover:bg-blue-700
                                                 text-sm font-medium text-white
                                                 rounded-md shadow-sm
                                                 focus:outline-none focus:ring-2
                                                 focus:ring-offset-2 focus:ring-blue-500
                                                 transition-all duration-200"
                                    >
                                        Cart is empty. Click here to add items to your cart.
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

