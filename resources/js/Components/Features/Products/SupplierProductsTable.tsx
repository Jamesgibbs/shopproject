import React from "react";
import { Link } from "@inertiajs/react";
import styles from "./SupplierProductsTable.module.css";
import { Product } from "@/types/product";
import { Edit2, MoreVertical, Package, ExternalLink } from "lucide-react";

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
    const getStockStatus = (quantity: number) => {
        if (quantity === 0) return { label: 'Out of Stock', class: styles.outOfStock };
        if (quantity < 10) return { label: 'Low Stock', class: styles.lowStock };
        return { label: 'In Stock', class: styles.inStock };
    };

    const formatDate = (dateString: string | number | null) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className={styles.container}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.imageCol}>Product</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Last Updated</th>
                        <th className={styles.actionsCol}></th>
                    </tr>
                    </thead>

                    <tbody>
                    {products.data.length > 0 ? (
                        products.data.map(product => {
                            const status = getStockStatus(product.stock_quantity);
                            return (
                                <tr key={product.id}>
                                    <td className={styles.imageCol}>
                                        <div className={styles.imageWrapper}>
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className={styles.productImage}
                                                />
                                            ) : (
                                                <div className={styles.placeholderImage}>
                                                    <Package size={20} className="text-gray-400" />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.nameWrapper}>
                                            <span className={styles.productName}>{product.name}</span>
                                            <span className={styles.productId}>ID: #{product.id}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${status.class}`}>
                                            {status.label}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={styles.stockCount}>{product.stock_quantity}</span>
                                    </td>
                                    <td>
                                        <span className={styles.price}>£{Number(product.price).toFixed(2)}</span>
                                    </td>
                                    <td>
                                        <span className={styles.date}>{formatDate(product.updated_at)}</span>
                                    </td>
                                    <td className={styles.actionsCol}>
                                        <div className={styles.actionGroup}>
                                            <Link
                                                href={route('products.edit', product.id)}
                                                className={styles.iconButton}
                                                title="Edit product"
                                            >
                                                <Edit2 size={16} />
                                            </Link>
                                            <a
                                                href={`/products/${product.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.iconButton}
                                                title="View on site"
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={7} className={styles.emptyState}>
                                No products found matching your search.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {products.links.length > 3 && (
                <div className={styles.pagination}>
                    {products.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || "#"}
                            className={`${styles.pageLink} ${link.active ? styles.active : ""} ${!link.url ? styles.disabled : ""}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
