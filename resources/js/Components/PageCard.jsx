import React from 'react'

export default function PageCard({ title, actions, children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
                            {actions}
                        </div>
                    </div>
                    <div className="p-6">{children}</div>
                </div>
            </div>
        </div>
    )
}
