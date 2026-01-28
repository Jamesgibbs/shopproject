import styles from './Logo.module.css'
import { Link } from '@inertiajs/react'

export default function Logo() {
    return (
        <Link href="/dashboard" className={styles.logo}>
            <span className={styles.icon}>
                <div></div>
                <div></div>
                <div></div>
            </span>
            <span className={styles.text}>GibbsGoods</span>
        </Link>
    )
}
