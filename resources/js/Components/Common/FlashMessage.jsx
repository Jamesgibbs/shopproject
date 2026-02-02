import { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'

const FlashMessage = () => {
    const { props } = usePage()
    const flash = props.flash || {}
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (flash.success || flash.error) {
            setVisible(true)
            const duration = (props.import_errors && props.import_errors.length > 0) ? 10000 : 3000
            const timeout = setTimeout(() => setVisible(false), duration)
            return () => clearTimeout(timeout)
        }
    }, [flash.success, flash.error, props.import_errors])

    if (!visible || (!flash.success && !flash.error)) return null

    const message = flash.success || flash.error
    const isSuccess = !!flash.success
    const importErrors = props.import_errors || []

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
            <div
                className={`px-4 py-2 rounded shadow transition-all duration-300 ${
                    isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
            >
                {message}
                {importErrors.length > 0 && (
                    <ul className="mt-2 text-xs list-disc list-inside max-h-40 overflow-y-auto">
                        {importErrors.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default FlashMessage
