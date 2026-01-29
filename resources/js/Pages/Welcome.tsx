import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";
import {JSX} from "react";
import {PageProps} from "@/types";
import {usePage} from "@inertiajs/react";
import FeaturedCarousel from "@/Components/Features/Products/FeaturedCarousel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SupplierLayout from "@/Layouts/SupplierLayout";

export default function Welcome({ auth }): JSX.Element {
    const { featuredProducts = [] } = usePage<PageProps>().props

    let Layout

    if (auth?.user && auth.user.role === 'customer') {
        Layout = AuthenticatedLayout;
    } else if (auth?.user && auth.user.role === 'supplier') {
        Layout = SupplierLayout;
    } else {
        Layout = GuestLayout;
    }

    return (
        <Layout>
            <div />
            <h2> Featured Products</h2>

            <FeaturedCarousel products={featuredProducts} />
        </Layout>
    );
}
