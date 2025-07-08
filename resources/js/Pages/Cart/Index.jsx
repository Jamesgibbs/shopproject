import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import CartTable from "./CartTable.jsx";

export default function Index() {
    const { products = [] } = usePage().props;
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm(prev => !prev);

    return (
        <div>
            <h1>Shopping Cart</h1>

            <button onClick={toggleForm} className="btn btn-primary mb-4">
                {showForm ? 'Cancel' : 'Add To Cart'}
            </button>

            {/*{showForm && <CreateProduct />}*/}

            <CartTable products={products} />
        </div>
    );
}

Index.layout = page => <GuestLayout children={page} />;
