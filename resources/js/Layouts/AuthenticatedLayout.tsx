import { useState, PropsWithChildren, ReactNode } from 'react'
import {Link, usePage} from '@inertiajs/react'
import Logo from "@/Components/Layout/Logo";
import Footer from "@/Components/Layout/Footer";
import CategoriesDropdown from '@/Components/Features/Categories/CategoriesDropdown.jsx'
import styles from './AuthenticatedLayout.module.css'
import {PageProps} from "@/types";
import React from "react";

export default function AuthenticatedLayout({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth, flash, categories } = usePage<PageProps>().props
    const user = auth.user

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)

    return (
            <div className={styles.layoutWrapper}>
                <nav className={styles.navbar}>
                    <div className={styles.navInner}>
                        <div className={styles.navLeft}>

                            <div className={styles.navLinks}>
                                <Logo />
                                <CategoriesDropdown categories={categories} />
                            </div>

                            <div className={styles.searchWrapper}>
                                <form method="GET" action="/search" className={styles.searchForm}>
                                    <input
                                        type="text"
                                        name="q"
                                        placeholder="Search products…"
                                        className={styles.searchInput}
                                    />
                                </form>
                            </div>

                            {user?.role === 'customer' && (
                                <div className={styles.customerLinks}>
                                    <Link href={route('cart.view')}>
                                        Basket
                                    </Link>

                                    <Link href={route('payment.form')}>
                                        Checkout
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="navbar-right">
                            <Link href={route('logout')} className="btn btn-light">
                                Sign Out
                            </Link>

                            <Link href={route('cart.view')} className="btn btn-light">
                                Basket
                            </Link>
                        </div>

                        <button
                            className={styles.mobileToggle}
                            onClick={() => setShowingNavigationDropdown(prev => !prev)}
                        >
                            {showingNavigationDropdown ? '✕' : '☰'}
                        </button>
                    </div>
                </nav>

                {header && (
                    <header className={styles.header}>
                        <div className={styles.headerInner}>{header}</div>
                    </header>
                )}

                <main className={styles.main}>
                    {flash.success && <div className={styles.flashSuccess}>{flash.success}</div>}
                    {flash.error && <div className={styles.flashError}>{flash.error}</div>}

                    {children}
                </main>

                <Footer />
            </div>
    )
}
