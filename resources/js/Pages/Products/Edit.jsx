import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { useForm, usePage } from '@inertiajs/react';

export default function Edit() {
    const { product, errors } = usePage().props;

    const { data, setData, post, processing } = useForm({
        id: product.id,
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        stock_quantity: product.stock_quantity || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/products/update/${product.id}`);

    };

    return (
        <>
            <div>
                <h1>Edit Product</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={data.name} onChange={e => setData('name', e.target.value)} />
                <textarea placeholder="Description" value={data.description} onChange={e => setData('description', e.target.value)} />
                <input type="number" placeholder="Price" value={data.price} onChange={e => setData('price', e.target.value)} />
                <input type="number" placeholder="Stock" value={data.stock_quantity} onChange={e => setData('stock_quantity', e.target.value)} />
                <button type="submit" disabled={processing}>Save</button>
                {errors && <div>{Object.values(errors).join(', ')}</div>}
            </form>
        </>
    );
}

Edit.layout = page => <AuthenticatedLayout children={page} />;
