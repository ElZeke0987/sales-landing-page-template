export interface ProductForClient {
    id: number;
    name_id: string;
    name: string;
    price: number;
    description: string;
    thumbnail_url: string;
    category_id: number;
    outstanding: boolean;
}