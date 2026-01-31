
import { Product } from "../table-types";
import { UpdateProductType, AddProductType, BaseProductType } from "../schemas/product.schema";
import { dbPool } from "../db";

import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";



export class ProductRepository{
    async getAllProducts(): Promise<Product[]> {
        // TODO: Implementar lógica para obtener todos los productos

        const result = await dbPool.query("SELECT * FROM products");

        return result.rows;
    }
    
    async addProduct(product: AddProductType, supabase: SupabaseClient): Promise<PostgrestSingleResponse<null>> {
        // TODO: Implementar lógica para agregar un producto
        console.log("ESTE ES EL PRODUCTO: ", product)
        const filteredPropsProduct = {
            name: product.name,
            description: product.description,
            price: product.price,
            thumbnail_url: product.thumbnail_url,
            stock: product.stock,
            outstanding: product.outstanding,
            category_id: product.category_id,
        };
        const result = await supabase.from("products").insert(filteredPropsProduct);
        console.log("result of adding a product: ", result)

        return result;
    }
    async updateProduct(product: UpdateProductType, supabase: SupabaseClient): Promise<PostgrestSingleResponse<null>> {
        console.log("testing product to update in repo: ",product);
        const result = await supabase.from("products").update({
            name: product.name,
            description: product.description,
            price: product.price,
            thumbnail_url: product.thumbnail_url,
            stock: product.stock,
            outstanding: product.outstanding,
            category_id: product.category_id,
        }).eq("id", product.id);
        
        console.log("result of update: ",result);
        
        return result;
    }
    async deleteProduct(id: number, supabase: SupabaseClient){

        const result = await supabase.from("products").delete().eq("id", id);
        return result;
    }
}
