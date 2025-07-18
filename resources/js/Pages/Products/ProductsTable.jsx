import React from 'react';
import { Link, router } from '@inertiajs/react';


export default function ProductsTable({ products, user }) {
    const isSupplier = user && user.role === 'supplier';

    if (!products || products.length === 0) {
        return <p>No products available.</p>;
    }

    const handleDelete = (productId) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${productId}`);
        }
    };

    const handleAddToCart = (e, productId) => {
        e.stopPropagation();
        router.post('/cart', {
            product_id: productId,
            quantity: 1
        });
    };


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="table-header">Name</th>
                    <th className="table-header">Description</th>
                    <th className="table-header">Price</th>
                    <th className="table-header">Stock</th>
                    <th className="table-header">Actions</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                    <tr
                        key={product.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => window.location.href = `/products/${product.id}`}
                    >
                        <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">£{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{product.stock_quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                                {isSupplier && product.supplier_id === user.id ? (
                                    <>
                                        <Link
                                            href={`/products/${product.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={(e) => handleAddToCart(e, product.id)}
                                        disabled={product.stock_quantity < 1}
                                        className="btn-yellow"
                                    >
                                        Add to Basket
                                    </button>

                                )}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
