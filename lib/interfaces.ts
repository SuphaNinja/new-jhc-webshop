

export type Cart = {
    userId: string;
    items: Array<{
        id: string; 
        productId: string;
        name: string;
        quantity: number;
        price: number;
        image: string;
        color?: string;
        size?: string;
    }>;
}