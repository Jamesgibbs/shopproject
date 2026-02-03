import Checkbox from '@/Components/Common/Checkbox'
import InputError from '@/Components/Common/InputError'
import InputLabel from '@/Components/Common/InputLabel'
import PrimaryButton from '@/Components/Common/PrimaryButton'
import TextInput from '@/Components/Common/TextInput'
import GuestLayout from '@/Layouts/GuestLayout.tsx'
import { Head, Link, useForm } from '@inertiajs/react'
import styles from './Login.module.css'
import Logo from '@/Components/Layout/Logo'

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('login'), {
            onFinish: () => reset('password'),
        })
    }

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex flex-col items-center mb-6">
                <Logo />
            </div>

            {status && <div className={styles.statusMessage}>{status}</div>}

            <form onSubmit={submit} className={styles.form}>
                <div className={styles.formGroup}>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={styles.input}
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className={styles.error} />
                </div>

                <div className={styles.formGroup}>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={styles.input}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className={styles.error} />
                </div>

                <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className={styles.checkboxText}>Remember me</span>
                    </label>
                </div>

                <div className={styles.formActions}>
                    {canResetPassword && (
                        <Link href={route('password.request')} className={styles.link}>
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className={styles.submitBtn} disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    )
}
