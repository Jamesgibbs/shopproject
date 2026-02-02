import React, { PropsWithChildren, ReactNode } from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from './AuthenticatedLayout';
import SupplierLayout from './SupplierLayout';
import GuestLayout from './GuestLayout';
import { PageProps } from '@/types';

interface AppLayoutProps {
    header?: ReactNode;
}

export default function AppLayout({ children, header }: PropsWithChildren<AppLayoutProps>) {
    const { auth } = usePage<PageProps>().props;

    if (auth?.user && auth.user.role === 'customer') {
        return <AuthenticatedLayout header={header}>{children}</AuthenticatedLayout>;
    } else if (auth?.user && auth.user.role === 'supplier') {
        return <SupplierLayout>{children}</SupplierLayout>;
    } else {
        return <GuestLayout header={header}>{children}</GuestLayout>;
    }
}
