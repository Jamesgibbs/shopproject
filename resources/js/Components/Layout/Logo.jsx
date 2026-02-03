import styles from './Logo.module.css'
import { Link } from '@inertiajs/react'
import { ShoppingBag } from 'lucide-react'

export default function Logo() {
    return (
        <Link href="/dashboard" className={styles.logo}>
            <span className={styles.icon}>
                <ShoppingBag size={24} strokeWidth={2.5} />
            </span>
            <span className={styles.text}>GibbsGoods</span>
        </Link>
    )
}
