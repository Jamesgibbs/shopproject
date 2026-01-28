import { Link } from '@inertiajs/react'
import CategoriesDropdown from '@/Components/CategoriesDropdown.jsx'
import { usePage } from '@inertiajs/react'
import styles from './GuestLayout.module.css'
import Logo from "@/Components/Logo.jsx";
import Footer from "@/Components/Footer.jsx";
import React from "react";
import { PageProps } from '@/types';

interface GuestLayoutProps {
    header?: React.ReactNode
    children?: React.ReactNode
}

export default function GuestLayout({ header, children }: GuestLayoutProps) {
    const { categories } = usePage<PageProps>().props

    return (
        <div className="layout">
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
                                <form method="GET" action="/search" className={styles.searchForm}>
                                    <input
                                        type="text"
                                        name="q"
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

            <main className="page-content">{children}</main>
            <Footer />
        </div>

    )
}
