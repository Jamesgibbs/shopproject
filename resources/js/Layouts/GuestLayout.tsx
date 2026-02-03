import { Link, usePage, router } from '@inertiajs/react'
import CategoriesDropdown from '@/Components/Features/Categories/CategoriesDropdown.jsx'
import FlashMessage from '@/Components/Common/FlashMessage'
import styles from './GuestLayout.module.css'
import Logo from "@/Components/Layout/Logo";
import Footer from "@/Components/Layout/Footer";
import React, { PropsWithChildren, ReactNode } from "react";
import { PageProps } from '@/types';
import { ShoppingCart, Search, LogIn, UserPlus } from 'lucide-react';

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
                                    <div className={styles.inputContainer}>
                                        <Search className={styles.searchIcon} size={18} />
                                        <input
                                            type="text"
                                            name="q"
                                            defaultValue={new URLSearchParams(window.location.search).get('q') || ''}
                                            placeholder="Search products…"
                                            className={styles.searchInput}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="navbar-right">
                            <Link href={route('login')} className="btn btn-light flex items-center gap-2">
                                <LogIn size={20} />
                                <span>Sign In</span>
                            </Link>

                            <Link href={route('register')} className="btn btn-dark flex items-center gap-2">
                                <UserPlus size={20} />
                                <span>Register</span>
                            </Link>

                            <Link href={route('cart.view')} className="btn btn-light flex items-center gap-2">
                                <ShoppingCart size={20} />
                                <span>Basket</span>
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
                {children}
            </main>
            <Footer />
        </div>

    )
}
