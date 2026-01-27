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
                    href="/supplier/orders"
                    className={isActive('/supplier/orders') ? styles.active : ''}
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
                    href="/supplier/settings"
                    className={isActive('/supplier/settings') ? styles.active : ''}
                >
                    Settings
                </Link>
            </nav>
        </aside>
    )
}
