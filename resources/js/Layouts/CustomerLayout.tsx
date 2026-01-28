import React from 'react';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

interface CustomerLayoutProps {
    children: React.ReactNode;
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <header>Customer Navbar - Welcome {auth.user?.name}</header>
            <main>{children}</main>
            <footer>Customer Footer</footer>
        </>
    )
}
