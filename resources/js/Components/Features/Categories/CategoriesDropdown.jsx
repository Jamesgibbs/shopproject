import { Link } from '@inertiajs/react'
import { useState } from 'react'
import styles from './CategoriesDropdown.module.css'

export default function CategoriesDropdown({ categories }) {
    const [open, setOpen] = useState(false)

    const toggle = () => setOpen(!open)

    return (
        <div className={styles.dropdown}>
            <button className={styles.trigger} onClick={toggle}>
                <span className={styles.icon}>
                    <div></div>
                    <div></div>
                    <div></div>
                </span>
                Categories
            </button>

            {open && (
                <div className={styles.menu}>
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className={styles.item}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
