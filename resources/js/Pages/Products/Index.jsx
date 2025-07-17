import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ProductsTable from "./ProductsTable.jsx";
import CreateProduct from "./Create.jsx";
import PageCard from "@/Components/PageCard.jsx";

export default function Index() {
    const { products, auth = [] } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const user = auth.user;
    const isSupplier = user && user.role === 'supplier';

    const toggleForm = () => setShowForm(prev => !prev);

    const actions = isSupplier && (
        <button
            onClick={toggleForm}
            className={`
                ${showForm
                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
            }
                inline-flex items-center px-4 py-2
                text-sm font-medium text-white
                rounded-md shadow-sm
                focus:outline-none focus:ring-2 focus:ring-offset-2
                transition-all duration-200
            `}
        >
            <span className="mr-2">{showForm ? '×' : '+'}</span>
            {showForm ? 'Cancel' : 'Add Product'}
        </button>
    );

    return (
        <PageCard title="Products" actions={actions}>
            {showForm && (
                <div className="bg-gray-50 p-6 mb-6 border border-gray-200 rounded-md">
                    <CreateProduct onSuccess={() => setShowForm(false)} />
                </div>
            )}
            <ProductsTable products={products} user={user} />
        </PageCard>
    );
}

Index.layout = page => <AuthenticatedLayout children={page} />;
