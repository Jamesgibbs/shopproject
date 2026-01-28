import styles from './Footer.module.css'
import { Link } from '@inertiajs/react'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>GibbsGoods</div>

                <div className={styles.links}>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/terms">Terms</Link>
                    <Link href="/privacy">Privacy</Link>
                </div>

                <div className={styles.copy}>
                    © {new Date().getFullYear()} GibbsGoods. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
