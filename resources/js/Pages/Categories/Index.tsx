import TextInput from '@/Components/Form/TextInput'
import { useForm } from '@inertiajs/react'
import React from "react"

export default function Create() {
    const { data, setData, post, errors } = useForm({
        product_id: '',
        quantity: 1,
    })

    function submit(e: React.FormEvent) {
        e.preventDefault()
        post('/orders')
    }

    // @ts-ignore
    return (
            <form onSubmit={submit}>
                <TextInput
                    label="Product"
                    value={data.product_id}
                    onChange={(e) => setData('product_id', e.target.value)}
                    error={errors.product_id}
                />

                <TextInput
                    label="Quantity"
                    type="number"
                    value={data.quantity}
                    onChange={(e) => setData('quantity', e.target.value)}
                    error={errors.quantity}
                />

                <button type="submit">Create Order</button>
            </form>
    )
}
