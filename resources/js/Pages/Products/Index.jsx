import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ProductsTable from "./ProductsTable.jsx";
import CreateProduct from "./Create.jsx";

export default function Index() {
    const { products, auth = [] } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const user = auth.user;
    const isSupplier = user && user.role === 'supplier';

    const toggleForm = () => setShowForm(prev => !prev);

    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                Products
            </h1>

            <button
                onClick={toggleForm}
                className={`${
                    showForm ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-semibold py-2 px-6 rounded shadow mb-6`}
            >
                {showForm ? 'Cancel' : 'Add Product'}
            </button>

            {showForm && <CreateProduct />}

            <ProductsTable products={products} user={user} />
        </div>
    );
}

Index.layout = page => <AuthenticatedLayout children={page} />;
