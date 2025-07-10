import React from 'react';
import CartTable from "./CartTable.jsx";

import Index from "@/Pages/Cart/Index.jsx";
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
        <CartTable cartItems={cartItems}/>

            <div>
                <h1>Checkout</h1>
                <button onClick={handleCheckout}>Continue To Checkout!</button>
            </div>
        </div>
    );
}

ViewCart.layout = page => <AuthenticatedLayout children={page} />;
