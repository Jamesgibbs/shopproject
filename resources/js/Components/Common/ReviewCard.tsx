import StarRating from "@/Components/Common/StarRating";
import React, {JSX} from "react"
import styles from "./ReviewCard.module.css"

interface Review {
    id: number
    rating: number
    comment: string
    created_at: string
    user: {
        id: number
        name: string
    }
}

interface ReviewCardProps {
    review: Review
}
export default function ReviewCard( { review } : ReviewCardProps): JSX.Element {
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
