import { Head, Link } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import GuestLayout from '@/Layouts/GuestLayout.tsx'
import styles from './Product.module.css'

const StarRating = ({ rating }) => {
    return (
        <div className={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`${styles.star} ${
                        star <= Math.round(rating) ? styles.starActive : ''
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    )
}

const ReviewCard = ({ review }) => {
    return (
        <div className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
                <div className={styles.reviewUser}>
                    <span className={styles.reviewUserName}>{review.user.name}</span>
                    <span className={styles.reviewDate}>
                        {new Date(review.created_at).toLocaleDateString()}
                    </span>
                </div>

                <StarRating rating={review.rating} />
            </div>

            <p className={styles.reviewComment}>{review.comment}</p>
        </div>
    )
}

export default function Product({ product, auth }) {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout

    console.log(product)

    return (
        <Layout>
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.inner}>
                            <div className={styles.productSection}>
                                <div className={styles.productLayout}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className={styles.productImage}
                                    />

                                    <div>
                                        <h1 className={styles.productTitle}>{product.name}</h1>

                                        <div className={styles.ratingRow}>
                                            <StarRating rating={product.average_rating} />

                                            <span className={styles.ratingText}>
                                                {product.average_rating.toFixed(1)} (
                                                {product.reviews_count} reviews)
                                            </span>
                                        </div>

                                        <p className={styles.price}>£ {product.price}</p>
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
        </Layout>
    )
}

