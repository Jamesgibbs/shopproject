import { Head } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import GuestLayout from '@/Layouts/GuestLayout.jsx'

const StarRating = ({ rating }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    style={{
                        width: '20px',
                        height: '20px',
                        color: star <= Math.round(rating) ? '#facc15' : '#d1d5db',
                        marginRight: '2px',
                    }}
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
        <div
            style={{
                background: '#fff',
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                marginBottom: '1rem',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{review.user.name}</span>
                    <span
                        style={{
                            color: '#9ca3af',
                            fontSize: '0.875rem',
                            marginLeft: '0.5rem',
                        }}
                    >
                        {new Date(review.created_at).toLocaleDateString()}
                    </span>
                </div>

                <StarRating rating={review.rating} />
            </div>

            <p style={{ color: '#4b5563' }}>{review.comment}</p>
        </div>
    )
}

export default function Product({ product, auth }) {
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout

    return (
        <Layout>
            <div style={{ padding: '3rem 0' }}>
                <div
                    style={{
                        maxWidth: '1100px',
                        margin: '0 auto',
                        padding: '0 1rem',
                    }}
                >
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                    >
                        <div style={{ padding: '1.5rem' }}>
                            {/* Product Details */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '2rem',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: '300px',
                                            height: '300px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            flexShrink: 0,
                                        }}
                                    />

                                    <div>
                                        <h1
                                            style={{
                                                fontSize: '2rem',
                                                fontWeight: '700',
                                                marginBottom: '0.5rem',
                                            }}
                                        >
                                            {product.name}
                                        </h1>

                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: '1rem',
                                            }}
                                        >
                                            <StarRating rating={product.average_rating} />

                                            <span
                                                style={{
                                                    marginLeft: '0.5rem',
                                                    color: '#4b5563',
                                                }}
                                            >
                                                {product.average_rating.toFixed(1)} (
                                                {product.reviews_count} reviews)
                                            </span>
                                        </div>

                                        <p
                                            style={{
                                                fontSize: '1.5rem',
                                                fontWeight: '700',
                                                color: '#111827',
                                            }}
                                        >
                                            ${product.price}
                                        </p>

                                        <p
                                            style={{
                                                marginTop: '1rem',
                                                color: '#4b5563',
                                            }}
                                        >
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews */}
                            <div style={{ marginTop: '2rem' }}>
                                <h2
                                    style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '700',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    Customer Reviews
                                </h2>

                                <div>
                                    {product.reviews.length > 0 ? (
                                        product.reviews.map((review) => (
                                            <ReviewCard key={review.id} review={review} />
                                        ))
                                    ) : (
                                        <p style={{ color: '#6b7280' }}>No reviews yet</p>
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
