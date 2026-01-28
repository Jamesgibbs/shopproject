import {Link, router} from '@inertiajs/react'
import React, {JSX, useEffect, useState} from 'react'
import styles from './CategoriesDropdown.module.css'
import {Category} from "@/types";

interface CategoriesDropdownProps {
    categories: Category[]
}

export default function CategoriesDropdown({ categories }: CategoriesDropdownProps): JSX.Element
{
    const [open, setOpen] = useState(false)

    const toggle = () => setOpen(prev => !prev)

    // Close when opening a new page
    useEffect(() => {
        return router.on('finish', () => {
            setOpen(false)
        })
    }, [])

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
                    {categories.map(category => (
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

