import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import {JSX} from "react";
import {PageProps} from "@/types";
import {usePage} from "@inertiajs/react";
import FeaturedCarousel from "@/Components/Features/Products/FeaturedCarousel";

export default function Welcome(): JSX.Element {
    const { featuredProducts = [] } = usePage<PageProps>().props

    return (
        <AppLayout>
            <div />
            <h2> Featured Products</h2>

            <FeaturedCarousel products={featuredProducts} />
        </AppLayout>
    );
}
