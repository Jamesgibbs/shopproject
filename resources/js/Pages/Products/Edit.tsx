import React from 'react'
import { useForm, usePage, Link } from '@inertiajs/react'
import SupplierLayout from "@/Layouts/SupplierLayout.tsx"
import styles from './Edit.module.css'
import { PageProps, Category } from '../../types'

interface Product {
    id: number
    name: string
    description: string
    price: number
    stock_quantity: number
}

interface EditPageProps extends Record<string, unknown> {
    product: Product
    categories: Category[]
    selectedCategory: number | null
}

export default function Edit() {
    const { product, categories, selectedCategory, errors } = usePage<PageProps<EditPageProps>>().props

    const { data, setData, post, processing } = useForm({
        id: product.id,
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        stock_quantity: product.stock_quantity || 0,
        category_id: selectedCategory ?? '',
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post(`/products/update/${product.id}`)
    }

    return (
        <div className={styles.editProductPage}>
            <h1 className={styles.editTitle}>Edit Product</h1>

            <form onSubmit={handleSubmit} className={styles.editForm}>
                <h2 className={styles.editSubtitle}>Edit Product</h2>

                <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="price">Price £</label>
                    <input
                        id="price"
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', Number(e.target.value))}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="stock_quantity">Stock Quantity</label>
                    <input
                        id="stock_quantity"
                        type="number"
                        value={data.stock_quantity}
                        onChange={(e) => setData('stock_quantity', Number(e.target.value))}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="category_id">Category</label>
                    <select
                        id="category_id"
                        value={data.category_id.toString()}
                        onChange={(e) => setData('category_id', Number(e.target.value))}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id.toString()}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className={styles.formErrors}>
                        {Object.values(errors).join(', ')}
                    </div>
                )}

                <button type="submit" disabled={processing} className={styles.btnPrimary}>
                    Save
                </button>

                <Link href="/supplier/products" className={styles.btnSecondary}>
                    Back to Products
                </Link>
            </form>
        </div>
    )
}

Edit.layout = (page: React.ReactNode) => <SupplierLayout children={page} />
