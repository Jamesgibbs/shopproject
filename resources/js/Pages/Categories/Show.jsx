import React from 'react'
import { usePage, Link } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout.tsx'
import PageCard from '@/Components/Common/PageCard.jsx'
import CategoryCard from '@/Components/Features/Categories/CategoryCard.jsx'
import CardGrid from '@/Components/Common/CardGrid.jsx'
import styles from './Show.module.css'

export default function Show() {
    const { category } = usePage().props

    const breadcrumb = category.parent
        ? [
            { id: category.parent.id, name: category.parent.name },
            { id: category.id, name: category.name }
        ]
        : [
            { id: category.id, name: category.name }
        ]


    return (
        <PageCard title="Category">
            <div className={styles.header}>
                <h1 className={styles.title}>{category.name}</h1>
                <p className={styles.breadcrumb}>
                    {breadcrumb.map((item, index) => (
                        <span key={item.id}>
                            <Link href={`/categories/${item.id}`}>
                                {item.name}
                            </Link>
                            {index < breadcrumb.length - 1 && ' / '}
                        </span>
                    ))}
                </p>

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
