import React from 'react'
import { usePage, Link } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout.jsx'
import PageCard from '@/Components/PageCard.jsx'
import CategoryTile from '@/Components/Categories/CategoryTile.jsx'
import CategoryCard from '@/Components/CategoryCard.jsx'
import CardGrid from '@/Components/CardGrid.jsx'

export default function Show() {
    const { category } = usePage().props

    return (
        <PageCard title="Category">
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '600' }}>{category.name}</h1>

                <p style={{ marginTop: '0.5rem', color: '#555' }}>{category.description}</p>
            </div>

            <CardGrid>
                {category.children.map((child) => (
                    <CategoryCard key={child.id} category={child} />
                ))}
            </CardGrid>

            {category.products?.length > 0 && (
                <section style={{ marginTop: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                        Products in this category
                    </h2>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                            gap: '1.5rem',
                        }}
                    >
                        {category.products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                style={{
                                    padding: '1rem',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    background: '#fff',
                                    textDecoration: 'none',
                                    color: '#333',
                                    transition: '0.2s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)')
                                }
                                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                            >
                                <strong>{product.name}</strong>

                                {product.image && (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: '100%',
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderRadius: '6px',
                                        }}
                                    />
                                )}

                                <span style={{ fontWeight: '600', marginTop: 'auto' }}>
                                    £{product.price}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </PageCard>
    )
}

Show.layout = (page) => <GuestLayout children={page} />
