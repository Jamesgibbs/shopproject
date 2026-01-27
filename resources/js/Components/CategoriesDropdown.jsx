import { Link } from '@inertiajs/react'
import { useState } from 'react'

export default function CategoriesDropdown({ categories }) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className="dropdown"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button className="dropdown-trigger">Categories</button>

            {open && (
                <div className="dropdown-menu">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="dropdown-item"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
