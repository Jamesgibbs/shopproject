import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Index from "@/Pages/Orders/Index.jsx";

export default function SalesHistory() {
    return (
        <div>
            <h1>Sales History</h1>
        </div>
    );
}

SalesHistory.layout = page => <AuthenticatedLayout children={page} />;
