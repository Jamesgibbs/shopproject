import SupplierLayout from '@/Layouts/SupplierLayout'
import SupplierProductsTable from "@/Components/Features/Products/SupplierProductsTable";
import {Link} from "@inertiajs/react";
import styles from "./SupplierIndex.module.css";
import React from "react";
import {Product} from "@/types/product";

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
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>Products</h1>

                <Link href={route('products.supplier.products.create')} className={styles.addButton}>
                    Add new Product
                </Link>
            </div>

            <SupplierProductsTable products={products}/>
        </div>
    )
}

SupplierIndex.layout = (page: React.ReactNode) => (
    <SupplierLayout>{page}</SupplierLayout>
);

