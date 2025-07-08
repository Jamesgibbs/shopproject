import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import ProductsTable from "./ProductsTable.jsx";
import CreateProduct from "./Create.jsx";

export default function Index() {
    const { products = [] } = usePage().props;
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm(prev => !prev);

    return (
        <div>
            <h1>Products</h1>

            <button onClick={toggleForm} className="btn btn-primary mb-4">
                {showForm ? 'Cancel' : 'Add Product'}
            </button>

            {showForm && <CreateProduct />}

            <ProductsTable products={products} />
        </div>
    );
}

Index.layout = page => <GuestLayout children={page} />;
