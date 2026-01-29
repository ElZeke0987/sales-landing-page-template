
import { Product } from "../table-types";
import { UpdateProductType, AddProductType, BaseProductType } from "../schemas/product.schema";
import { dbPool } from "../db";
import { z } from "zod";



export class ProductRepository{
    async getAllProducts(): Promise<Product[]> {
        // TODO: Implementar lógica para obtener todos los productos

        const result = await dbPool.query("SELECT * FROM products");

        return result.rows;
    }
    
    async addProduct(product: AddProductType): Promise<AddProductType> {
        // TODO: Implementar lógica para agregar un producto
        return product;
    }
    async updateProduct(product: UpdateProductType): Promise<UpdateProductType> {
        console.log("testing product to update in repo: ",product);
        const result = await dbPool.query("UPDATE products SET name = $1, description = $2, price = $3, thumbnail_url = $4 WHERE id = $5", [product.name, product.description, product.price, product.thumbnail_url, product.id]);
        

        
        return result.rows[0];
    }
}
