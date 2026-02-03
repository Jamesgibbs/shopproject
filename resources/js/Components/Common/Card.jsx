import styles from './Card.module.css'

export default function Card({ children, hover = true, className = '' }) {
    return (
        <div
            className={`${styles.card} ${hover ? styles.hover : ''} ${className}`}
        >
            {children}
        </div>
    )
}

