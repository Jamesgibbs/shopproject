export interface Review {
    id: number
    rating: number
    comment: string
    created_at: string
    user: {
        id: number
        name: string
    }
}

export interface Product {
    id: number
    name: string
    price: number
    description: string | null
    stock_quantity: number
    image: string | null
    average_rating: number
    reviews_count: number
    supplier_id: number
    supplier_name: string | null
    reviews: Review[]
    updated_at: number | null
}
