import React from 'react'
import { useForm, usePage, Link } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import styles from './Edit.module.css'
import { PageProps, Category } from '@/types'

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
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Link href={route('supplier.products.index')} className={styles.backLink}>
                    ← Back to Products
                </Link>
                <h1 className={styles.title}>Edit Product</h1>
                <p className={styles.subtitle}>Update your product information and inventory</p>
            </div>

            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formSection}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <input
                            id="name"
                            type="text"
                            className={styles.input}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <div className={styles.errorText}>{errors.name}</div>}
                    </div>

                    <div className={styles.formSection}>
                        <label htmlFor="description" className={styles.label}>Description</label>
                        <textarea
                            id="description"
                            className={styles.textarea}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <div className={styles.errorText}>{errors.description}</div>}
                    </div>

                    <div className={styles.formSection}>
                        <label htmlFor="price" className={styles.label}>Price £</label>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            className={styles.input}
                            value={data.price}
                            onChange={(e) => setData('price', Number(e.target.value))}
                        />
                        {errors.price && <div className={styles.errorText}>{errors.price}</div>}
                    </div>

                    <div className={styles.formSection}>
                        <label htmlFor="stock_quantity" className={styles.label}>Stock Quantity</label>
                        <input
                            id="stock_quantity"
                            type="number"
                            className={styles.input}
                            value={data.stock_quantity}
                            onChange={(e) => setData('stock_quantity', Number(e.target.value))}
                        />
                        {errors.stock_quantity && <div className={styles.errorText}>{errors.stock_quantity}</div>}
                    </div>

                    <div className={styles.formSection}>
                        <label htmlFor="category_id" className={styles.label}>Category</label>
                        <select
                            id="category_id"
                            className={styles.select}
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
                        {errors.category_id && <div className={styles.errorText}>{errors.category_id}</div>}
                    </div>

                    <div className={styles.actions}>
                        <button type="submit" disabled={processing} className={styles.submitBtn}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

Edit.layout = (page: React.ReactNode) => <AppLayout children={page} />
