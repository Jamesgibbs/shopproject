import { createContext, useContext, useEffect, useState } from 'react'

const DarkModeContext = createContext()

export function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(
        document.cookie.includes('darkMode=true') ||
            window.matchMedia('(prefers-color-scheme: dark)').matches
    )

    useEffect(() => {
        document.cookie = `darkMode=${darkMode}; path=/; max-age=31536000`
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    const toggleDarkMode = () => setDarkMode((prev) => !prev)

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const useDarkMode = () => {
    const context = useContext(DarkModeContext)
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider')
    }
    return context
}
