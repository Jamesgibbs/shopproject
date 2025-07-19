import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import MultiSelect from '@/Components/Multiselect';


export default function Create({ categories, onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        image: null,
        categories: [],
    });

    const [submitted, setSubmitted] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);

        // Create preview URL
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };


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

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Product Image
                        </label>
                        <div className="mt-1 flex items-center">
                            <div className="space-y-2">
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-indigo-50 file:text-indigo-700
                                    hover:file:bg-indigo-100"
                                    accept="image/*"
                                />
                                {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
                            </div>
                        </div>
                        {imagePreview && (
                            <div className="mt-2">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="h-32 w-32 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                            Categories
                        </label>
                        <MultiSelect
                            options={categories}
                            value={data.categories}
                            onChange={value => setData('categories', value)}
                            className="mt-1"
                        />
                        {errors.categories && <div className="text-red-500 text-sm mt-1">{errors.categories}</div>}
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
