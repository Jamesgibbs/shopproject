import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx'
import Index from '@/Pages/Orders/Index.jsx'
export default function DeliveryInfo() {
    return (
        <div>
            <form></form>
        </div>
    )
}

DeliveryInfo.layout = (page) => <AuthenticatedLayout children={page} />
