import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SupplierLayout from '@/Layouts/SupplierLayout';
import GuestLayout from '@/Layouts/GuestLayout';

export function getLayout(auth) {
    const role = auth?.user?.role;

    const layouts = {
        customer: AuthenticatedLayout,
        supplier: SupplierLayout,
    };

    return layouts[role] ?? GuestLayout;
}
