import { Link } from '@inertiajs/react'
import Card from './Card'

export default function CategoryCard({ category }) {
    return (
        <Link
            href={`/categories/${category.slug}`}
            style={{ textDecoration: 'none', color: '#333' }}
        >
            <Card>
                {category.image && (
                    <img
                        src={category.image}
                        alt={category.name}
                        style={{
                            width: '100%',
                            height: '120px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            marginBottom: '0.75rem',
                        }}
                    />
                )}

                <strong>{category.name}</strong>
            </Card>
        </Link>
    )
}
