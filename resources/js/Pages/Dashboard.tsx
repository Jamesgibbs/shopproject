import AppLayout from '@/Layouts/AppLayout'
import {Head, usePage} from '@inertiajs/react'
import React from "react"
import {PageProps} from "@/types";
import FeaturedCarousel from "@/Components/Features/Products/FeaturedCarousel";

export default function Dashboard() {
    const { auth, featuredProducts = [] } = usePage<PageProps>().props

    return (
        <AppLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>
            }
        >
            <Head title="Dashboard" />

            <h2> Featured Products</h2>

            <FeaturedCarousel products={featuredProducts} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {auth.user ? "You're logged in!" : 'Welcome!'}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
