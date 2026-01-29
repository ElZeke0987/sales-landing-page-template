export interface Product {
    id: number;
    name_id: string;
    name: string;
    price: number;
    description: string;
    thumbnail_url: string;
    category_id: number;
    outstanding: boolean;
    stock: number;
}

export interface Category {
    id: number;
    name_id: string;
    name: string;
    act: boolean;
}