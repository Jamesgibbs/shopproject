import {Link, router} from '@inertiajs/react'
import styles from './SupplierTopNav.module.css'
import Logo from "@/Components/Layout/Logo.jsx";

export default function SupplierTopNav() {
    return (
        <header className={styles.topnav}>
            <div className={styles.left}>
                <Logo />
                <Link href="/supplier/dashboard" className={styles.brand}>
                    Supplier Portal
                </Link>
            </div>

            <button
                className={styles.logoutButton}
                onClick={() => router.post(route('logout'))}
            >
                Logout
            </button>
        </header>
    )
}
