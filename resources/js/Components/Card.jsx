import styles from './Card.module.css'

export default function Card({ children, hover = true }) {
    return (
        <div
            className={`${styles.card} ${hover ? styles.hover : ''}`}
        >
            {children}
        </div>
    )
}

