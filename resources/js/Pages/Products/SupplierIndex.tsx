import SupplierLayout from '@/Layouts/SupplierLayout'
import SupplierProductsTable from "@/Components/Features/Products/SupplierProductsTable";
import {Link} from "@inertiajs/react";
import styles from "@/Pages/Auth/Login.module.css";
import React from "react";

interface PaginationLink {
    url: string | null
    label: string
    active: boolean
}

interface SupplierIndexProps {
    products: {
        data: Product[]
        links: PaginationLink[]
    }
}


export default function SupplierIndex({ products }: SupplierIndexProps) {
    return (
        <div>
            <h1>Products</h1>

            <Link href={route('password.request')} className={styles.link}>
                Add new Product
            </Link>

            <SupplierProductsTable products={products}/>
        </div>
    )
}

SupplierIndex.layout = (page: React.ReactNode) => (
    <SupplierLayout>{page}</SupplierLayout>
);

