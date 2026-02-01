import React from "react";
import { Link } from "@inertiajs/react";
import styles from "./SupplierProductsTable.module.css";
import { Product } from "@/types/product";

interface PaginationLink {
    url: string | null
    label: string
    active: boolean
}

interface Props {
    products: {
        data: Product[]
        links: PaginationLink[]
    }
}

export default function SupplierProductsTable({ products }: Props) {
    return (
        <div className={styles.card}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Updated</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {products.data.map(product => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.stock_quantity}</td>
                        <td>£{product.price}</td>
                        <td>{product.updated_at}</td>
                        <td>
                            <Link
                                href={route('products.edit', product.id)}
                                className={styles.editLink}
                            >
                                Edit
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className={styles.pagination}>
                {products.links.map((link, i) => (
                    <Link
                        key={i}
                        href={link.url || "#"}
                        className={`${styles.pageLink} ${link.active ? styles.active : ""}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
