import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import {JSX} from "react";
import {PageProps} from "@/types";
import {usePage} from "@inertiajs/react";
import FeaturedCarousel from "@/Components/Features/Products/FeaturedCarousel";
import ProductsTable from "@/Pages/Products/ProductsTable";

interface WelcomeProps extends Record<string, unknown> {
    featuredProducts: any[];
    searchResults?: any;
    searchQuery?: string;
}

export default function Welcome(): JSX.Element {
    const { featuredProducts = [], searchResults, searchQuery, auth } = usePage<PageProps<WelcomeProps>>().props

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
                    <FeaturedCarousel products={featuredProducts} />
                </>
            )}
        </AppLayout>
    );
}
