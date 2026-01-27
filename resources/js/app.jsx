import '../css/app.css'
import './bootstrap'

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.{jsx,tsx}')
        const importPage = pages[`./Pages/${name}.tsx`] ?? pages[`./Pages/${name}.jsx`]
        if (!importPage) {
            throw new Error(`Page not found: ${name}`)
        }
        return importPage()
    },
    setup({ el, App, props }) {
        const root = createRoot(el)

        root.render(<App {...props} />)
    },
    progress: {
        color: '#4B5563',
    },
})
