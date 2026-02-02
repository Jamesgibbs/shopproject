import AppLayout from '@/Layouts/AppLayout'
import SupplierProductsTable from "@/Components/Features/Products/SupplierProductsTable";
import {Link, useForm} from "@inertiajs/react";
import styles from "./SupplierIndex.module.css";
import React, { useRef } from "react";
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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { post, processing } = useForm();

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            post(route('products.supplier.products.import'), {
                // @ts-ignore
                data: { csv_file: file },
                onSuccess: () => {
                    if (fileInputRef.current) fileInputRef.current.value = '';
                },
                forceFormData: true,
            });
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>Products</h1>

                <div className={styles.actions}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onFileSelected}
                        accept=".csv"
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={handleImportClick}
                        className={styles.importButton}
                        disabled={processing}
                    >
                        {processing ? 'Importing...' : 'Bulk Import (CSV)'}
                    </button>
                    <Link href={route('products.supplier.products.create')} className={styles.addButton}>
                        Add new Product
                    </Link>
                </div>
            </div>

            <SupplierProductsTable products={products}/>
        </div>
    )
}

SupplierIndex.layout = (page: React.ReactNode) => (
    <AppLayout>{page}</AppLayout>
);

