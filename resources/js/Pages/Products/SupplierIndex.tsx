import AppLayout from '@/Layouts/AppLayout'
import SupplierProductsTable from "@/Components/Features/Products/SupplierProductsTable";
import {Link, useForm, router} from "@inertiajs/react";
import styles from "./SupplierIndex.module.css";
import React, { useRef, useState, useEffect } from "react";
import {Product} from "@/types/product";
import { Plus, Upload, Search } from "lucide-react";

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
    filters?: {
        search?: string
    }
}


export default function SupplierIndex({ products, filters }: SupplierIndexProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { post, processing } = useForm();
    const [search, setSearch] = useState(filters?.search || '');

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            post(route('products.supplier.products.import'), {
                preserveUrl: false,
                data: { csv_file: file },
                onSuccess: () => {
                    if (fileInputRef.current) fileInputRef.current.value = '';
                },
                forceFormData: true
            });
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('supplier.products.index'), { search }, {
            preserveState: true,
            replace: true
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters?.search || '')) {
                router.get(route('supplier.products.index'), { search }, {
                    preserveState: true,
                    replace: true
                });
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Products</h1>
                    <p className={styles.subtitle}>Manage your product catalog and inventory</p>
                </div>

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
                        <Upload size={18} className="mr-2" />
                        {processing ? 'Importing...' : 'Bulk Import'}
                    </button>
                    <Link href={route('products.supplier.products.create')} className={styles.addButton}>
                        <Plus size={18} className="mr-2" />
                        Add new Product
                    </Link>
                </div>
            </div>

            <div className={styles.filtersBar}>
                <form onSubmit={handleSearch} className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className={styles.searchInput}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>
            </div>

            <SupplierProductsTable products={products}/>
        </div>
    )
}

SupplierIndex.layout = (page: React.ReactNode) => (
    <AppLayout>{page}</AppLayout>
);

