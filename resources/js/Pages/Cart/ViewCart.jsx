import React from 'react';
import CartTable from "./CartTable.jsx";
import { Link } from '@inertiajs/react';
import {usePage, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function ViewCart() {
    const { cartItems = [] } = usePage().props;
    const { post } = useForm();

    const handleCheckout = () => {
        post('/checkout');
    };

    return (
        <div>
            <div className="flex flex-col items-center p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Cart</h1>
                <CartTable cartItems={cartItems}/>

                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow"
                    >
                        Continue To Checkout!
                    </button>
                ) : (
                    <Link
                        href="/products"
                        className="w-fit bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded shadow"
                    >
                        Cart is empty. Click here to add items to your cart.
                    </Link>
                )}
            </div>
        </div>
    );
}

ViewCart.layout = page => <AuthenticatedLayout children={page} />;
