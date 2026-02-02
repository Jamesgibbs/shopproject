import { Link, usePage, router } from '@inertiajs/react'
import CategoriesDropdown from '@/Components/Features/Categories/CategoriesDropdown.jsx'
import FlashMessage from '@/Components/Common/FlashMessage'
import styles from './GuestLayout.module.css'
import Logo from "@/Components/Layout/Logo";
import Footer from "@/Components/Layout/Footer";
import React, { PropsWithChildren, ReactNode } from "react";
import { PageProps } from '@/types';

interface GuestLayoutProps {
    header?: ReactNode
}

export default function GuestLayout({ header, children }: PropsWithChildren<GuestLayoutProps>) {
    const { categories, flash } = usePage<PageProps>().props

    return (
        <div className="layout">
            <FlashMessage />
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-inner">
                        {/* Left navigation */}
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

                        {/* Right side */}
                        <div className="navbar-right">
                            <Link href={route('login')} className="btn btn-light">
                                Sign In
                            </Link>

                            <Link href={route('register')} className="btn btn-dark">
                                Register
                            </Link>

                            <Link href={route('cart.view')} className="btn btn-light">
                                Basket
                            </Link>
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
                {flash.success && <div className="flash-success">{flash.success}</div>}
                {flash.error && <div className="flash-error">{flash.error}</div>}
                {children}
            </main>
            <Footer />
        </div>

    )
}
