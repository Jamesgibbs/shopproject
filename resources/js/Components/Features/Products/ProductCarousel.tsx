import React from "react";
import styles from "./ProductCarousel.module.css";
import { Link } from "@inertiajs/react";
import Card from "@/Components/Common/Card";

interface Product {
    id: number;
    name: string;
    price: number | string;
    deal_price?: number | string | null;
    image: string;
}

interface Props {
    products: Product[];
}

export default function ProductCarousel({ products }: Props) {
    return (
        <div className={styles.carouselWrapper}>
            {products.map(product => (
                <div key={product.id} className={styles.carouselItem}>
                    <Link
                        href={`/products/${product.id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Card>
                            <img src={product.image} alt={product.name} className={styles.productImage} />

                            <div className={styles.productName}>{product.name}</div>
                            <div className={styles.productPrice}>
                                {product.deal_price ? (
                                    <>
                                        <span className={styles.originalPrice}>£ {product.price}</span>
                                        <span className={styles.dealPrice}>£ {product.deal_price}</span>
                                    </>
                                ) : (
                                    <span>£ {product.price}</span>
                                )}
                            </div>
                        </Card>
                    </Link>
                </div>
            ))}
        </div>
    );
}
