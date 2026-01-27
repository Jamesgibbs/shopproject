import { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'

export default function BillingInfoForm({ auth, billingInfo }) {
    const { data, setData, post, processing, errors } = useForm({
        billing_name: billingInfo ? billingInfo.billing_name : '',
        billing_address: billingInfo ? billingInfo.billing_address : '',
        email_address: billingInfo ? billingInfo.email_address : '',
        phone_number: billingInfo ? billingInfo.phone_number : '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('profile.savebillinginfo'))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {billingInfo ? 'Update Billing Information' : 'Add Billing Information'}
                </h2>
            }
        >
            <Head title="Billing Information" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="billing_name" value="Billing Name" />
                                    <TextInput
                                        id="billing_name"
                                        type="text"
                                        name="billing_name"
                                        value={data.billing_name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('billing_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.billing_name} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="billing_address" value="Billing Address" />
                                    <TextInput
                                        id="billing_address"
                                        type="text"
                                        name="billing_address"
                                        value={data.billing_address}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('billing_address', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.billing_address} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email_address" value="Email Address" />
                                    <TextInput
                                        id="email_address"
                                        type="email"
                                        name="email_address"
                                        value={data.email_address}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('email_address', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email_address} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="phone_number" value="Phone Number" />
                                    <TextInput
                                        id="phone_number"
                                        type="tel"
                                        name="phone_number"
                                        value={data.phone_number}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.phone_number} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Save Billing Information
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
