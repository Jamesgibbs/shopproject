import {Link, router} from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import styles from './Product.module.css'
import StarRating from "@/Components/Common/StarRating"
import ReviewCard from "@/Components/Common/ReviewCard"
import React, {JSX} from "react"
import { Product as ProductType } from '../../types/product'
import { PageProps } from '@/types'

export default function Product({ product }: PageProps<{ product: ProductType }>): JSX.Element {
    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, productId: number) => {
        e.stopPropagation()
        router.post('/cart', {
            product_id: productId,
            quantity: 1,
        })
    }

    return (
        <AppLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.inner}>
                            <div className={styles.productSection}>
                                <div className={styles.productLayout}>
                                    <img
                                        src={product.image || '/images/placeholder.png'}
                                        alt={product.name}
                                        className={styles.productImage}
                                    />

                                    <div>
                                        <h1 className={styles.productTitle}>{product.name}</h1>

                                        <div className={styles.ratingRow}>
                                            <StarRating rating={product.average_rating} />

                                            <span className={styles.ratingText}>
                                                ({ product.average_rating.toFixed(1) }
                                                { product.reviews_count } reviews )
                                            </span>

                                            <button
                                                onClick={(e) => handleAddToCart(e, product.id)}
                                                disabled={product.stock_quantity < 1}
                                                className="btn-yellow"
                                            >
                                                Add to Basket
                                            </button>
                                        </div>

                                        <p className={styles.price}>£{Number(product.price).toFixed(2)}</p>
                                        <p className={styles.description}>
                                            Supplier: {' '}
                                            <Link
                                                href={`/suppliers/${product.supplier_id}/products`}
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                {product.supplier_name}
                                            </Link>
                                        </p>
                                        <p className={styles.description}>{product.description}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.reviewsSection}>
                                <h2 className={styles.reviewsTitle}>Customer Reviews</h2>

                                <div>
                                    {product.reviews.length > 0 ? (
                                        product.reviews.map((review) => (
                                            <ReviewCard key={review.id} review={review} />
                                        ))
                                    ) : (
                                        <p className={styles.noReviews}>No reviews yet</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

