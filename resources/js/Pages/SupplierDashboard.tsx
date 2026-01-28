import SupplierLayout from '@/Layouts/SupplierLayout'
import React from "react"

export default function SupplierDashboard() {
    return <div>Welcome Supplier</div>
}

SupplierDashboard.layout = (page) => <SupplierLayout children={page} />
