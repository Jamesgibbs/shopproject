import SupplierSidebar from '@/Components/Layout/SupplierSidebar'
import SupplierTopNav from '@/Components/Layout/SupplierTopNav'
import FlashMessage from '@/Components/Common/FlashMessage'
import styles from './SupplierLayout.module.css'
import React, { PropsWithChildren } from "react"

export default function SupplierLayout({ children }: PropsWithChildren) {
    return (
        <div className={styles.wrapper}>
            <FlashMessage />
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

