import React from 'react'
import { usePage, Link } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout.jsx'
import PageCard from '@/Components/PageCard.jsx'
import CategoryCard from '@/Components/CategoryCard.jsx'
import CardGrid from '@/Components/CardGrid.jsx'
import styles from './Show.module.css'

export default function Show() {
    const { category } = usePage().props

    return (
        <PageCard title="Category">
            <div className={styles.header}>
                <h1 className={styles.title}>{category.name}</h1>
                <p className={styles.description}>{category.description}</p>
            </div>

            <CardGrid>
                {category.children.map((child) => (
                    <CategoryCard key={child.id} category={child} />
                ))}
            </CardGrid>

            {category.products?.length > 0 && (
                <section className={styles.productsSection}>
                    <h2 className={styles.productsTitle}>Products in this category</h2>

                    <div className={styles.productsGrid}>
                        {category.products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className={styles.productCard}
                            >
                                <strong>{product.name}</strong>

                                {product.image && (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className={styles.productImage}
                                    />
                                )}

                                <span className={styles.productPrice}>
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
