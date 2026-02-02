import { PropsWithChildren, ReactNode } from 'react'
import {Link, router, usePage} from '@inertiajs/react'
import Logo from "@/Components/Layout/Logo";
import Footer from "@/Components/Layout/Footer";
import CategoriesDropdown from '@/Components/Features/Categories/CategoriesDropdown.jsx'
import FlashMessage from '@/Components/Common/FlashMessage'
import styles from './AuthenticatedLayout.module.css'
import {PageProps} from "@/types";
import React from "react";

export default function AuthenticatedLayout({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth, flash, categories } = usePage<PageProps>().props
    const user = auth.user

    return (
        <div className="layout">
            <FlashMessage />
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-inner">
                        <div className="navbar-left">
                            <div className="nav-links">
                                <Logo />
                                <CategoriesDropdown categories={categories} />
                            </div>

                            <div className={styles.searchWrapper}>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.currentTarget);
                                    router.get('/', { q: formData.get('q') });
                                }} className={styles.searchForm}>
                                    <input
                                        type="text"
                                        name="q"
                                        defaultValue={new URLSearchParams(window.location.search).get('q') || ''}
                                        placeholder="Search products…"
                                        className={styles.searchInput}
                                    />
                                </form>
                            </div>
                        </div>

                        <div className="navbar-right">
                            <Link href={route('cart.view')} className="btn btn-light">
                                Basket
                            </Link>

                            <button
                                onClick={() => router.post(route('logout'))}
                                className="btn btn-dark"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="page-header">
                    <div className="header-container">{header}</div>
                </header>
            )}

            <main className="page-content">
                {children}
            </main>

            <Footer />
        </div>
    )
}
