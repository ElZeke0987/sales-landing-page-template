
import { Product } from "../table-types";
import { dbPool } from "../db";

export class ProductRepository{
    async getAllProducts(): Promise<Product[]> {
        // TODO: Implementar lógica para obtener todos los productos

        const result = await dbPool.query("SELECT * FROM products");

        return result.rows;
    }
    
    async addProduct(product: Product): Promise<Product> {
        // TODO: Implementar lógica para agregar un producto
        return product;
    }
}
