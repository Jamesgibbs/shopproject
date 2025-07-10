import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Create({ onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/products', {
            onSuccess: () => {
                reset();
                if (onSuccess) onSuccess(); // Close form in parent
            }
        });
    };

    return (
        <>
            {!submitted && (
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
                    <h1 className="text-xl font-bold text-gray-800">Add Product</h1>

                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 font-medium text-gray-700">Name</label>
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
                        <label htmlFor="description" className="mb-1 font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            placeholder="Product description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="price" className="mb-1 font-medium text-gray-700">Price</label>
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
                        <label htmlFor="stock" className="mb-1 font-medium text-gray-700">Stock Quantity</label>
                        <input
                            id="stock"
                            type="number"
                            placeholder="0"
                            value={data.stock_quantity}
                            onChange={(e) => setData('stock_quantity', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {errors && (
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
                </form>
            )}
        </>
    );

}
