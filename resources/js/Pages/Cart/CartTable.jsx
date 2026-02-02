import React from 'react'
import { router, Link } from '@inertiajs/react'
import styles from './CartTable.module.css'

export default function CartTable({ cartItems }) {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        return (
            <div className={styles['empty-cart']}>
                <p className={styles['empty-cart-text']}>Your cart is empty.</p>
            </div>
        )
    }

    // Group items by supplier to mimic Etsy style
    const groupedItems = cartItems.reduce((acc, item) => {
        const supplierId = item.supplier_id || 'unknown';
        if (!acc[supplierId]) {
            acc[supplierId] = {
                id: item.supplier_id,
                name: item.supplier_name || 'Other',
                items: []
            };
        }
        acc[supplierId].items.push(item);
        return acc;
    }, {});

    const handleQuantityChange = (itemId, newQuantity, productId) => {
        router.post(route('cart.updateQuantity'), {
            cart_item_id: itemId,
            quantity: newQuantity,
            product_id: productId || 0,
        })
    }

    const handleRemove = (itemId) => {
        router.post(route('cart.remove'), {
            id: itemId,
        })
    }

    return (
        <div className={styles['cart-groups']}>
            {Object.values(groupedItems).map((group) => (
                <div key={group.id} className={styles['cart-group']}>
                    {/* Supplier Header */}
                    <div className={styles['group-header']}>
                        <div className={styles['shop-info']}>
                            <span className={styles['shop-label']}>Shop:</span>
                            {group.id !== 'unknown' ? (
                                <Link
                                    href={route('suppliers.products', group.id)}
                                    className={styles['shop-link']}
                                >
                                    {group.name}
                                </Link>
                            ) : (
                                <span className={styles['shop-name']}>{group.name}</span>
                            )}
                        </div>
                        <span className={styles['shipping-badge']}>
                            Free shipping eligible
                        </span>
                    </div>

                    {/* Products in this group */}
                    <div className={styles['items-list']}>
                        {group.items.map((item) => (
                            <div key={item.id} className={styles['cart-item']}>
                                {/* Product Image */}
                                <div className={styles['item-image-container']}>
                                    <Link href={route('products.view', item.product_id)}>
                                        {item.image ? (
                                            <img
                                                className={styles['item-image']}
                                                src={item.image.startsWith('http') ? item.image : `/storage/${item.image}`}
                                                alt={item.name}
                                            />
                                        ) : (
                                            <div className={styles['item-image-placeholder']}>
                                                No image
                                            </div>
                                        )}
                                    </Link>
                                </div>

                                {/* Product Info */}
                                <div className={styles['item-details']}>
                                    <div className={styles['item-header']}>
                                        <div className={styles['item-info']}>
                                            <Link
                                                href={route('products.view', item.product_id)}
                                                className={styles['product-link']}
                                            >
                                                {item.name}
                                            </Link>
                                            <div className={styles['item-meta']}>
                                                <span>In stock</span>
                                                <span>•</span>
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className={styles['remove-btn']}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div className={styles['item-pricing']}>
                                            <p className={styles['item-total']}>£{(item.price * item.quantity).toFixed(2)}</p>
                                            {item.quantity > 1 && (
                                                <p className={styles['item-unit-price']}>£{item.price} each</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quantity and Bottom Actions */}
                                    <div className={styles['item-actions']}>
                                        <div className={styles['quantity-controls']}>
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        item.quantity - 1,
                                                        item.product_id
                                                    )
                                                }
                                                disabled={item.quantity <= 1}
                                                className={styles['quantity-btn']}
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
                                            </button>
                                            <span className={styles['quantity-value']}>{item.quantity}</span>
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        item.quantity + 1,
                                                        item.product_id
                                                    )
                                                }
                                                className={styles['quantity-btn']}
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                            </button>
                                        </div>

                                        <div className={styles['stock-status']}>
                                            <p className={styles['stock-status-text']}>Rare find! Only a few left in stock.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
