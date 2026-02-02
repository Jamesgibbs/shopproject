import React from 'react'
import CartTable from './CartTable.jsx'
import { Link, router } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import AppLayout from "@/Layouts/AppLayout";
import styles from './ViewCart.module.css'


export default function ViewCart() {
    const { cartItems = [] } = usePage().props
    const handleCheckout = () => {
        router.post(route('cart.checkout'))
    }

    return (
        <AppLayout>
            <div className={styles['viewcart-wrapper']}>
                <div className={styles['viewcart-container']}>
                    <div className={styles['viewcart-card']}>
                        <div className={styles['viewcart-header']}>
                            <div className="flex justify-between items-center">
                                <h1 className={styles['viewcart-title']}>Your Basket</h1>
                            </div>
                        </div>

                        <div className="p-6">
                            <CartTable cartItems={cartItems} />

                            <div className={styles['viewcart-summary']}>
                                <div className="text-center sm:text-left">
                                    <p className={styles['viewcart-summary-label']}>Total items in cart</p>
                                    <p className={styles['viewcart-summary-value']}>{cartItems.reduce((acc, item) => acc + item.quantity, 0)} items</p>
                                </div>

                                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                                    <button
                                        onClick={handleCheckout}
                                        className={styles['checkout-btn']}
                                    >
                                        Proceed to Checkout
                                    </button>
                                ) : (
                                    <Link
                                        href="/"
                                        className={styles['start-shopping-btn']}
                                    >
                                        Start Shopping
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

