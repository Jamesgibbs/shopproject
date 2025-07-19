import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';

export default function PaymentForm({ auth }) {

    const { data, setData, processing, reset } = useForm({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
    });

    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Demo card validation
        if (data.cardNumber === '4242424242424242') {
            setMessage('Payment processed successfully! (Demo Mode)');
            // Optional: reset form
            setTimeout(() => {
                router.post(route('payment.process'));
            }, 1500);

        } else {
            setMessage('For demo, use test card: 4242 4242 4242 4242');
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Payment Information</h2>}
        >
            <Head title="Payment Information" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {message && (
                                <div className={`mb-4 p-4 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="cardName" value="Name on Card" />
                                    <TextInput
                                        id="cardName"
                                        type="text"
                                        value={data.cardName}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('cardName', e.target.value)}
                                        required
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <InputLabel htmlFor="cardNumber" value="Card Number" />
                                    <TextInput
                                        id="cardNumber"
                                        type="text"
                                        value={data.cardNumber}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('cardNumber', e.target.value.replace(/\s/g, ''))}
                                        required
                                        maxLength="16"
                                        placeholder="4242 4242 4242 4242"
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <InputLabel htmlFor="expiryDate" value="Expiry Date" />
                                        <TextInput
                                            id="expiryDate"
                                            type="text"
                                            value={data.expiryDate}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('expiryDate', e.target.value)}
                                            required
                                            placeholder="MM/YY"
                                            maxLength="5"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <InputLabel htmlFor="cvv" value="CVV" />
                                        <TextInput
                                            id="cvv"
                                            type="text"
                                            value={data.cvv}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('cvv', e.target.value)}
                                            required
                                            maxLength="3"
                                            placeholder="123"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Process Payment
                                    </PrimaryButton>
                                </div>
                            </form>

                            <div className="mt-4 text-sm text-gray-600">
                                <p>Demo Card Details:</p>
                                <ul className="list-disc list-inside">
                                    <li>Card Number: 4242 4242 4242 4242</li>
                                    <li>Any future expiry date</li>
                                    <li>Any 3-digit CVV</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
