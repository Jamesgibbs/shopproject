import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx'
import { useForm, usePage, Link } from '@inertiajs/react'

export default function Edit() {
    const { product, errors } = usePage().props

    const { data, setData, post, processing } = useForm({
        id: product.id,
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        stock_quantity: product.stock_quantity || 0,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(`/products/update/${product.id}`)
    }

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Edit Product</h1>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
            >
                <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>

                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-1 font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Product name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="mb-1 font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        placeholder="Product description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="price" className="mb-1 font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        id="price"
                        type="number"
                        placeholder="£0.00"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="stock_quantity" className="mb-1 font-medium text-gray-700">
                        Stock Quantity
                    </label>
                    <input
                        id="stock_quantity"
                        type="number"
                        placeholder="0"
                        value={data.stock_quantity}
                        onChange={(e) => setData('stock_quantity', e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="text-red-600 font-medium">
                        {Object.values(errors).join(', ')}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow"
                >
                    Save
                </button>

                <Link
                    href="/products"
                    className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow"
                >
                    Back to Products
                </Link>
            </form>
        </>
    )
}

Edit.layout = (page) => <AuthenticatedLayout children={page} />
