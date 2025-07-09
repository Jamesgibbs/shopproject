import React from 'react';
import { usePage, useForm } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";

export default function Product() {
    const { product } = usePage().props;
    const { data, setData, post, processing } = useForm({
        product_id: product.id,
        quantity: 1,
    });

    const handleAddToCart = () => {
        post('/cart');
    };


    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: £{product.price}</p>
            <p>Stock: {product.stock_quantity}</p>

            <button onClick={handleAddToCart} disabled={processing}>
                Add to Cart
            </button>
        </div>
    );
}

Product.layout = page => <GuestLayout children={page} />;
