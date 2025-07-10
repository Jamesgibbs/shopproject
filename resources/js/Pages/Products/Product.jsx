import React from 'react';
import {usePage, useForm, Link} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Product() {
    const { product, auth } = usePage().props;
    const user = auth.user;
    const isCustomer = user && user.role === 'customer';

    const { data, setData, post, processing } = useForm({
        product_id: product.id,
        quantity: 1,
    });

    const handleAddToCart = () => {
        post('/cart');
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <h1>Product Name: {product.name}</h1>
            <p>Product Description: {product.description}</p>
            <p>Price: £{product.price}</p>
            <p>Stock: {product.stock_quantity}</p>

            {isCustomer && (
                <button onClick={handleAddToCart}
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow mb-6"
                >
                    Add to Cart
                </button>
            )}

            <Link
                href="/products"
                className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow"
            >
                Back To Products
            </Link>
        </div>
    );
}

Product.layout = page => <AuthenticatedLayout children={page} />;
