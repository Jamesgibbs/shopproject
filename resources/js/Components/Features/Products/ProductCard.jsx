import { Link } from '@inertiajs/react'
import Card from '@/Components/Common/Card.jsx'

export default function ProductCard({ product }) {
    return (
        <Link href={`/products/${product.id}`} style={{ textDecoration: 'none', color: '#333' }}>
            <Card>
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginBottom: '0.75rem',
                    }}
                />

                <strong>{product.name}</strong>

                <span style={{ color: '#666', marginTop: '0.5rem' }}>£{product.price}</span>
            </Card>
        </Link>
    )
}
