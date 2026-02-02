import React from 'react'
import { Head } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout.tsx'
import PageCard from '@/Components/Common/PageCard'
import ProductCard from '@/Components/Features/Products/ProductCard'
import CardGrid from '@/Components/Common/CardGrid'
import Pagination from '@/Components/Pagination/Pagination'

export default function SupplierProducts({ supplier, products }) {
    return (
        <>
            <Head title={`${supplier.name}'s Products`} />

            <PageCard title={`${supplier.name}'s`}>
                <h2>{supplier.supplier_overview}</h2>
                {products.data.length > 0 ? (
                    <>
                        <CardGrid>
                            {products.data.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </CardGrid>

                        <div className="mt-6">
                            <Pagination links={products.links} />
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500 text-center py-8">
                        This supplier has no products listed.
                    </p>
                )}
            </PageCard>
        </>
    )
}

SupplierProducts.layout = (page) => <AppLayout children={page} />
