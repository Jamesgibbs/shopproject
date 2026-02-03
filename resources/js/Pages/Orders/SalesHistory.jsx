import React from 'react'
import { usePage, Link } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import styles from './SalesHistory.module.css'

export default function SalesHistory() {
    const { sales = [] } = usePage().props

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'completed': return styles.statusCompleted;
            case 'pending': return styles.statusPending;
            case 'processing': return styles.statusProcessing;
            case 'cancelled': return styles.statusCancelled;
            default: return '';
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>Sales History</h1>
                <p className={styles.subtitle}>Track your sales performance and order status</p>
            </div>

            <div className={styles.container}>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Order Total</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th className={styles.actionsCol}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.length > 0 ? (
                                sales.map((sale) => (
                                    <tr key={sale.id}>
                                        <td>
                                            <Link href={`/orders/${sale.order_id}`} className={styles.orderId}>
                                                #{sale.order_id}
                                            </Link>
                                        </td>
                                        <td>
                                            <span className={styles.customerName}>{sale.customer_name}</span>
                                        </td>
                                        <td>
                                            <div className={styles.productCell}>
                                                {sale.product_image && (
                                                    <img
                                                        src={sale.product_image}
                                                        alt={sale.product_name}
                                                        className={styles.productImage}
                                                    />
                                                )}
                                                <Link href={`/products/${sale.product_id}`} className={styles.productName}>
                                                    {sale.product_name}
                                                </Link>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={styles.amount}>£{sale.total_amount}</span>
                                        </td>
                                        <td>
                                            <span className={styles.date}>
                                                {new Date(sale.ordered_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${getStatusClass(sale.status)}`}>
                                                {sale.status}
                                            </span>
                                        </td>
                                        <td className={styles.actionsCol}>
                                            <Link href={`/orders/${sale.order_id}`} className={styles.viewLink}>
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className={styles.emptyState}>
                                        No sales records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

SalesHistory.layout = (page) => <AppLayout children={page} />
