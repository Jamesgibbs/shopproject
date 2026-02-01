import React, { useState } from 'react'
import { useForm } from '@inertiajs/react'
import SupplierLayout from "@/Layouts/SupplierLayout"
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
        <>
            {!submitted && (
                <form onSubmit={handleSubmit} className="form-container form-section">
                    <h1 className="form-title">Add Product</h1>

                    <div className="form-section">
                        <label htmlFor="name" className="label">Name</label>
                        <input
                            id="name"
                            type="text"
                            className="input"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    <div className="form-section">
                        <label htmlFor="description" className="label">Description</label>
                        <textarea
                            id="description"
                            className="textarea"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </div>

                    <div className="form-section">
                        <label htmlFor="price" className="label">Price</label>
                        <input
                            id="price"
                            type="number"
                            className="input"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                    </div>

                    <div className="form-section">
                        <label htmlFor="stock" className="label">Stock Quantity</label>
                        <input
                            id="stock"
                            type="number"
                            className="input"
                            value={data.stock_quantity}
                            onChange={(e) => setData('stock_quantity', e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="label">Product Image</label>
                        <input
                            type="file"
                            className="file-input"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="image-preview" />
                        )}
                    </div>

                    <button type="submit" disabled={processing} className="submit-btn">
                        Save
                    </button>
                </form>

            )}
        </>
    )
}

Create.layout = (page: React.ReactNode) => (
    <SupplierLayout>{page}</SupplierLayout>
);
