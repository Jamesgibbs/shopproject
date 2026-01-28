import React from 'react'
import { Link, router } from '@inertiajs/react'
import Pagination from '@/Components/Pagination/Pagination.jsx'


interface PaginationLink {
    url: string | null
    label: string
    active: boolean
}

interface PaginatedProducts {
    data: Product[]
    links: PaginationLink[]
}

interface SupplierProductsTableProps {
    products: PaginatedProducts
}

export default function SupplierProductsTable({ products } : SupplierProductsTableProps) {

    if (!products?.data?.length) {
        return <p>No products found.</p>;
    }

    const handleDelete = (productId: number) => {
        if (confirm("Are you sure you want to delete this product?")) {
            router.delete(`/products/${productId}`);
        }
    };

    const headers = ['Name', 'Description', 'Price', 'Stock', 'Actions']

    return (
        <div className="supplier-table-wrapper">
            <table className="supplier-table">
                <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {products.data.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>£{product.price}</td>
                        <td>{product.stock_quantity}</td>

                        <td>
                            <div className="supplier-actions">
                                <Link href={`/products/edit-product/${product.id}`}>
                                    Edit
                                </Link>

                                <button onClick={() => handleDelete(product.id)}>
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination links={products.links} />
        </div>
    )
}
