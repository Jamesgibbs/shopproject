import {Link, router} from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'
import styles from './Product.module.css'
import StarRating from "@/Components/Common/StarRating"
import ReviewCard from "@/Components/Common/ReviewCard"
import React, {JSX, useState} from "react"
import { Product as ProductType } from '../../types/product'
import { PageProps } from '@/types'
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react'

export default function Product({ product }: PageProps<{ product: ProductType }>): JSX.Element {
    const [quantity, setQuantity] = useState(1)

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, productId: number) => {
        e.stopPropagation()
        router.post('/cart', {
            product_id: productId,
            quantity: quantity,
        })
    }

    return (
        <AppLayout>
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <div className={styles.breadcrumb}>
                        <Link href="/" className={styles.backLink}>
                            <ArrowLeft size={16} />
                            <span>Back to Shopping</span>
                        </Link>
                    </div>

                    <div className={styles.productMain}>
                        {/* Left: Image Gallery (Single for now) */}
                        <div className={styles.imageSection}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={product.image || '/images/placeholder.png'}
                                    alt={product.name}
                                    className={styles.mainImage}
                                />
                            </div>
                        </div>

                        {/* Middle: Product Info */}
                        <div className={styles.infoSection}>
                            <h1 className={styles.productTitle}>{product.name}</h1>

                            <div className={styles.metaRow}>
                                <div className={styles.ratingBox}>
                                    <StarRating rating={product.average_rating} />
                                    <span className={styles.ratingCount}>
                                        {product.average_rating.toFixed(1)} ({product.reviews_count} reviews)
                                    </span>
                                </div>
                                <div className={styles.supplierLink}>
                                    By {' '}
                                    <Link
                                        href={`/suppliers/${product.supplier_id}/products`}
                                        className={styles.brandName}
                                    >
                                        {product.supplier_name}
                                    </Link>
                                </div>
                            </div>

                            <div className={styles.divider} />

                            <div className={styles.priceContainer}>
                                <span className={styles.currencySymbol}>£</span>
                                <span className={styles.priceAmount}>{Number(product.price).toFixed(2)}</span>
                            </div>

                            <div className={styles.descriptionSection}>
                                <h3 className={styles.sectionHeading}>Description</h3>
                                <p className={styles.descriptionText}>{product.description}</p>
                            </div>

                            <div className={styles.features}>
                                <div className={styles.featureItem}>
                                    <Truck size={20} />
                                    <span>Fast Delivery</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <ShieldCheck size={20} />
                                    <span>Secure Transaction</span>
                                </div>
                                <div className={styles.featureItem}>
                                    <RefreshCw size={20} />
                                    <span>30-Day Returns</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Buy Box */}
                        <div className={styles.buyBox}>
                            <div className={styles.buyBoxInner}>
                                <div className={styles.stockStatus}>
                                    {product.stock_quantity > 0 ? (
                                        <span className={styles.inStock}>In Stock ({product.stock_quantity} available)</span>
                                    ) : (
                                        <span className={styles.outOfStock}>Out of Stock</span>
                                    )}
                                </div>

                                {product.stock_quantity > 0 && (
                                    <div className={styles.quantityWrapper}>
                                        <label htmlFor="quantity">Quantity:</label>
                                        <select
                                            id="quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                                            className={styles.quantitySelect}
                                        >
                                            {[...Array(Math.min(10, product.stock_quantity))].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <button
                                    onClick={(e) => handleAddToCart(e, product.id)}
                                    disabled={product.stock_quantity < 1}
                                    className={product.stock_quantity < 1 ? styles.disabledBtn : styles.addToCartBtn}
                                >
                                    <ShoppingCart size={20} />
                                    <span>Add to Basket</span>
                                </button>

                                <div className={styles.guarantee}>
                                    <ShieldCheck size={14} />
                                    <span>Secure payment guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.reviewsSection}>
                        <div className={styles.reviewsHeader}>
                            <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
                            <div className={styles.reviewSummary}>
                                <StarRating rating={product.average_rating} />
                                <span>Based on {product.reviews_count} reviews</span>
                            </div>
                        </div>

                        <div className={styles.reviewsList}>
                            {product.reviews.length > 0 ? (
                                product.reviews.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))
                            ) : (
                                <div className={styles.emptyReviews}>
                                    <p>No reviews yet. Be the first to review this product!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

