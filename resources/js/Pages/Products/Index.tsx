import React, { useState } from 'react'
import { usePage } from '@inertiajs/react'
import ProductsTable from './ProductsTable.jsx'
import CreateProduct from './Create.jsx'
import PageCard from '@/Components/Common/PageCard.jsx'
import GuestLayout from '@/Layouts/GuestLayout'
import { PageProps, Category } from '@/types'
import styles from './Index.module.css'

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    supplier_name: string | null;
    average_rating: number | null;
    reviews_count: number | null;
    image: string | null;
    reviews: unknown[];
}

interface Paginated<T> {
    data: T[];
    links: Record<string, string | null>;
    meta: Record<string, unknown>;
}

interface IndexProps extends Record<string, unknown> {
    products: Paginated<Product>;
    categories: Category[];
}

export default function Index() {
    const { products, auth, categories = [] } = usePage<PageProps<IndexProps>>().props
    const [showForm, setShowForm] = useState(false)
    const user = auth.user
    const isSupplier = user && user.role === 'supplier'

    const toggleForm = () => setShowForm(prev => !prev)

    const actions = isSupplier ? (
        <button
            onClick={toggleForm}
            className={`${styles.actionButton} ${showForm ? styles.cancelButton : styles.addButton}`}
        >
            <span className={styles.actionIcon}>{showForm ? '×' : '+'}</span>
            {showForm ? 'Cancel' : 'Add Product'}
        </button>
    ) : null

    return (
        <PageCard title="Products" actions={actions}>
            {showForm && (
                <div className={styles.formWrapper}>
                    <CreateProduct onSuccess={() => setShowForm(false)} categories={categories} />
                </div>
            )}

            <ProductsTable products={products} user={user} />
        </PageCard>
    )
}

Index.layout = (page: React.ReactNode) => <GuestLayout>{page}</GuestLayout>
