import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import styles from './Edit.module.css';

interface Props {
    user: {
        id: number;
        name: string;
        supplier_overview: string | null;
    };
}

export default function Edit({ user }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        supplier_overview: user.supplier_overview || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('supplier.info.update'));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Company Information</h1>
                <p className={styles.subtitle}>Manage your supplier profile and description</p>
            </div>

            <div className={styles.card}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formSection}>
                        <label className={styles.label}>Company Name</label>
                        <input
                            type="text"
                            value={user.name}
                            disabled
                            className={styles.inputDisabled}
                        />
                        <p className={styles.helpText}>To change your company name, please visit account settings.</p>
                    </div>

                    <div className={styles.formSection}>
                        <label htmlFor="supplier_overview" className={styles.label}>
                            Company Overview / Description
                        </label>
                        <textarea
                            id="supplier_overview"
                            className={styles.textarea}
                            value={data.supplier_overview}
                            onChange={(e) => setData('supplier_overview', e.target.value)}
                            placeholder="Tell customers about your company..."
                            rows={10}
                        />
                        {errors.supplier_overview && (
                            <div className={styles.error}>{errors.supplier_overview}</div>
                        )}
                        <p className={styles.helpText}>
                            This description will be shown on your public supplier page. Max 2000 characters.
                        </p>
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="submit"
                            disabled={processing}
                            className={styles.submitButton}
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

Edit.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
