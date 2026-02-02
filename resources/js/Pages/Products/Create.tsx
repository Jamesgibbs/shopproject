import React, { useState } from 'react'
import { useForm, Link } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import styles from './Create.module.css'

export default function Create({ categories, onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        image: null,
        categories: [],
    })

    const [submitted] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setData('image', file)

        // Create preview URL
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            setImagePreview(null)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post('/products/supplier/products/create-submit', {
            onSuccess: () => {
                reset()
                if (onSuccess) onSuccess() // Close form in parent
            },
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Link href={route('supplier.products.index')} className={styles.backLink}>
                    ← Back to Products
                </Link>
            </div>

            {!submitted && (
                <div className={styles.formContainer}>
                    <h1 className={styles.formTitle}>Add Product</h1>

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
                            <label htmlFor="price" className={styles.label}>Price</label>
                            <input
                                id="price"
                                type="number"
                                step="0.01"
                                className={styles.input}
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                            />
                            {errors.price && <div className={styles.errorText}>{errors.price}</div>}
                        </div>

                        <div className={styles.formSection}>
                            <label htmlFor="stock" className={styles.label}>Stock Quantity</label>
                            <input
                                id="stock"
                                type="number"
                                className={styles.input}
                                value={data.stock_quantity}
                                onChange={(e) => setData('stock_quantity', e.target.value)}
                            />
                            {errors.stock_quantity && <div className={styles.errorText}>{errors.stock_quantity}</div>}
                        </div>

                        <div className={styles.formSection}>
                            <label className={styles.label}>Product Image</label>
                            <input
                                type="file"
                                className={styles.fileInput}
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                            )}
                            {errors.image && <div className={styles.errorText}>{errors.image}</div>}
                        </div>

                        <button type="submit" disabled={processing} className={styles.submitBtn}>
                            {processing ? 'Saving...' : 'Save Product'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

Create.layout = (page: React.ReactNode) => (
    <AppLayout>{page}</AppLayout>
);
