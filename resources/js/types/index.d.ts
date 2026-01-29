export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    role: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User | null;
    };
    categories: Category[];
    featuredProducts?: FeaturedProduct[];
    flash: {
        success: string | null;
        error: string | null;
    };
};

export interface FeaturedProduct {
    id: number
    name: string
    price: number
    image: string
    average_rating: number
    reviews_count: number
}
