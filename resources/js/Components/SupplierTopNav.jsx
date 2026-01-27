import { Link } from '@inertiajs/react'
import styles from './SupplierTopNav.module.css'
import Logo from "@/Components/Logo.jsx";

export default function SupplierTopNav() {
    return (
        <header className={styles.topnav}>
            <div className={styles.left}>
                <Logo />
                <Link href="/supplier/dashboard" className={styles.brand}>
                    Supplier Portal
                </Link>
            </div>

            <div className={styles.right}>
                <Link href="/supplier/settings">Settings</Link>
                <Link href="/logout" method="post">Logout</Link>
            </div>
        </header>
    )
}
