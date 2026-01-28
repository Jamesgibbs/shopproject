import React from "react";
import styles from "./FeaturedCarousel.module.css";
import { FeaturedProduct } from "@/types";

interface Props {
    products: FeaturedProduct[];
}

export default function FeaturedCarousel({ products }: Props) {
    return (
        <div className={styles.carouselWrapper}>
            {products.map(product => (
                <div key={product.id} className={styles.carouselItem}>
                    <img src={product.image} alt={product.name} />

                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productPrice}>£ {product.price}</div>
                </div>
            ))}
        </div>
    );
}
