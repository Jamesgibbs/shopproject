import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import {JSX} from "react";
import {PageProps} from "@/types";
import {usePage} from "@inertiajs/react";
import ProductCarousel, {CarouselProduct} from "@/Components/Features/Products/ProductCarousel";
import ProductsTable from "@/Pages/Products/ProductsTable";

interface WelcomeProps extends Record<string, unknown> {
    featuredProducts: CarouselProduct[];
    deals: CarouselProduct[];
    searchResults?: {
        data: CarouselProduct[];
        links: unknown[];
    };
    searchQuery?: string;
}

export default function Welcome(): JSX.Element {
    const { featuredProducts = [], deals = [], searchResults, searchQuery, auth } = usePage<PageProps<WelcomeProps>>().props

    return (
        <AppLayout>
            {searchQuery && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h2>
                    <ProductsTable products={searchResults} user={auth.user} />
                </div>
            )}

            {!searchQuery && (
                <>
                    <div />
                    <h2 className="text-2xl font-bold mb-4"> Featured Products</h2>
                    <ProductCarousel products={featuredProducts} />
                    <h2 className="text-2xl font-bold mt-8 mb-4">Today's Deals</h2>
                    <ProductCarousel products={deals} />
                </>
            )}
        </AppLayout>
    );
}
