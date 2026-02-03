import { Link, usePage } from '@inertiajs/react'
import styles from './SupplierSidebar.module.css'
import { LayoutDashboard, Package, Building2, ClipboardList, Warehouse, Settings } from 'lucide-react'

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
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>

                <Link href="/supplier/products" className={isActive('/supplier/products') ? styles.active : ''}>
                    <Package size={20} />
                    <span>Products</span>
                </Link>

                <Link
                    href={route('supplier.info.edit')}
                    className={isActive('/supplier/info') ? styles.active : ''}
                >
                    <Building2 size={20} />
                    <span>Company Info</span>
                </Link>


                <Link
                    href="/orders/sales-history"
                    className={isActive('/orders/sales-history') ? styles.active : ''}
                >
                    <ClipboardList size={20} />
                    <span>Orders</span>
                </Link>

                <Link
                    href="/supplier/inventory"
                    className={isActive('/supplier/inventory') ? styles.active : ''}
                >
                    <Warehouse size={20} />
                    <span>Inventory</span>
                </Link>

                <Link
                    href="/profile"
                    className={isActive('/profile') ? styles.active : ''}
                >
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </nav>
        </aside>
    )
}
