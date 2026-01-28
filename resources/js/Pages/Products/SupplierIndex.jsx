import SupplierLayout from '@/Layouts/SupplierLayout.tsx'
import SupplierProductsTable from "@/Components/SupplierProductsTable.jsx";
import {Link} from "@inertiajs/react";
import styles from "@/Pages/Auth/Login.module.css";

export default function SupplierIndex({ products }) {
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

SupplierIndex.layout = page => <SupplierLayout children={page} />
