import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';


export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/products');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Product</h1>
            <input type="text" placeholder="Name" value={data.name} onChange={e => setData('name', e.target.value)} />
            <textarea placeholder="Description" value={data.description} onChange={e => setData('description', e.target.value)} />
            <input type="number" placeholder="Price" value={data.price} onChange={e => setData('price', e.target.value)} />
            <input type="number" placeholder="Stock" value={data.stock_quantity} onChange={e => setData('stock_quantity', e.target.value)} />
            <button type="submit" disabled={processing}>Save</button>
            {errors && <div>{Object.values(errors).join(', ')}</div>}
        </form>
    );
}
