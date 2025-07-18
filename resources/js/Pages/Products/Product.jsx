import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-5 h-5 ${
                        star <= Math.round(rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <span className="font-semibold text-gray-800">{review.user.name}</span>
                    <span className="text-gray-400 text-sm ml-2">
                        {new Date(review.created_at).toLocaleDateString()}
                    </span>
                </div>
                <StarRating rating={review.rating} />
            </div>
            <p className="text-gray-600">{review.comment}</p>
        </div>
    );
};

export default function Product({ product }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {product.name}
                </h2>
            }
        >
            <Head title={product.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Product Details Section */}
                            <div className="mb-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                                        <div className="flex items-center mb-4">
                                            <StarRating rating={product.average_rating} />
                                            <span className="ml-2 text-gray-600">
                                                {product.average_rating.toFixed(1)} ({product.reviews_count} reviews)
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            ${product.price}
                                        </p>
                                        <p className="mt-4 text-gray-600">{product.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews Section */}
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                                <div className="space-y-4">
                                    {product.reviews.length > 0 ? (
                                        product.reviews.map((review) => (
                                            <ReviewCard key={review.id} review={review} />
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No reviews yet</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
