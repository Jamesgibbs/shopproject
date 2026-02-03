import { Link, usePage } from '@inertiajs/react'
import styles from './SupplierSidebar.module.css'

export default function SupplierSidebar() {
    const { url } = usePage()

    const isActive = (path) => url.startsWith(path)

    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>Supplier Portal</div>

            <nav className={styles.nav}>
                <Link
                    href="/supplier/dashboard"
                    className={isActive('/supplier/dashboard') ? styles.active : ''}
                >
                    Dashboard
                </Link>

                <Link href="/supplier/products" className={isActive('/supplier/products') ? styles.active : ''}>
                    Products
                </Link>

                <Link
                    href={route('supplier.info.edit')}
                    className={isActive('/supplier/info') ? styles.active : ''}
                >
                    Company Info
                </Link>


                <Link
                    href="/orders/sales-history"
                    className={isActive('/orders/sales-history') ? styles.active : ''}
                >
                    Orders
                </Link>

                <Link
                    href="/supplier/inventory"
                    className={isActive('/supplier/inventory') ? styles.active : ''}
                >
                    Inventory
                </Link>

                <Link
                    href="/profile"
                    className={isActive('/profile') ? styles.active : ''}
                >
                    Settings
                </Link>
            </nav>
        </aside>
    )
}
