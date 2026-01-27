import { Link } from '@inertiajs/react'
import React from 'react'
import Card from '@/Components/Card.jsx'

export default function CategoryTile({ category }) {
    if (!category?.children?.length) {
        return null
    }

    return (
        <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Featured Categories</h2>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem',
                }}
            >
                {category.children.map((child) => (
                    <Link
                        key={child.id}
                        href={`/categories/${child.slug}`}
                        style={{ textDecoration: 'none', color: '#333' }}
                    >
                        <Card>
                            <img
                                src={child.image}
                                alt={child.name}
                                style={{
                                    width: '100%',
                                    height: '120px',
                                    objectFit: 'cover',
                                    borderRadius: '6px',
                                }}
                            />
                            <strong>{child.name}</strong>
                        </Card>
                    </Link>
                ))}
            </div>
        </section>
    )
}
