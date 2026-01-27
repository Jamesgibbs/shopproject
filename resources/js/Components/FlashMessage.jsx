import { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'

const FlashMessage = () => {
    const { props } = usePage()
    const flash = props.flash || {}
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (flash.success || flash.error) {
            setVisible(true)
            const timeout = setTimeout(() => setVisible(false), 3000)
            return () => clearTimeout(timeout)
        }
    }, [flash.success, flash.error])

    if (!visible || (!flash.success && !flash.error)) return null

    const message = flash.success || flash.error
    const isSuccess = !!flash.success

    return (
        <div
            className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow transition-all duration-300 ${
                isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
        >
            {message}
        </div>
    )
}

export default FlashMessage
