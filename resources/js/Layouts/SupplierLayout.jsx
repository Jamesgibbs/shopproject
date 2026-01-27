import SupplierSidebar from '@/Components/SupplierSidebar'
import SupplierTopNav from '@/Components/SupplierTopNav'
import styles from './SupplierLayout.module.css'

export default function SupplierLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <SupplierTopNav />

            <div className={styles.body}>
                <SupplierSidebar />

                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    )
}

