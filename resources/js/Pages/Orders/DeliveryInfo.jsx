import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.tsx'

export default function DeliveryInfo() {
    return (
        <div>
            <form></form>
        </div>
    )
}

DeliveryInfo.layout = (page) => <AuthenticatedLayout children={page} />
