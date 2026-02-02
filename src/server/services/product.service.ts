import { ProductRepository } from "../repositories/products.repo";
import { Product } from "../table-types";
import { AddProductSchema, UpdateProductSchema, UpdateProductType, AddProductType, DeleteProductSchema, DeleteProductType } from "../schemas/product.schema";
import { z } from "zod";
import cloudinary from "../media.config";
import { authenticateAdmin } from "@/server/middleware/auth";

interface ProductServiceResponse {
    success: boolean;
    data?: any;
    error?: string;
}

interface ProductServiceError {
    code: number;
    
    error: string;
}

function sanitizeSlug(str: String) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}
class ProductService {
    constructor(private productRepository: ProductRepository = new ProductRepository() ) {}
    async getAllProducts() {
        return this.productRepository.getAllProducts();
    }
    async addProduct(body: Product) {

        
        const {supabase} = await authenticateAdmin();
        if(body.name&&typeof body.name === "string"){
            body.name_id = sanitizeSlug(body.name);
        }
        const resultProduct = await this.validateBody(AddProductSchema,body);

        
        
        const thumbnail = await this.uploadThumbnail(resultProduct.thumbnail_url);
        resultProduct.thumbnail_url = thumbnail.secure_url;
        const extraImages = await this.uploadExtraImages(resultProduct.extra_images);
        resultProduct.extra_images = extraImages.map(extraImage=>extraImage.secure_url);
        const productAdded = await this.productRepository.addProduct(resultProduct, supabase);
        return { success: true, data: productAdded } as ProductServiceResponse;
    }
    async updateProduct(body: Product) {
        const {supabase} = await authenticateAdmin();

        const resultProduct = await this.validateBody(UpdateProductSchema,body);

        try{
            if(resultProduct.thumbnail_url){
                const thumbnail = await this.uploadThumbnail(resultProduct.thumbnail_url);
                resultProduct.thumbnail_url = thumbnail.secure_url;
            }
            resultProduct.extra_images?.map(async extraImage=>{
                if(!extraImage){
                    return;
                }
                const extraImageResult = await this.uploadExtraImages([extraImage]);
                resultProduct.extra_images = extraImageResult.map(extraImage=>extraImage.secure_url);
            })
        }catch(err){
            console.log("ERROR UPLOADING IMAGES TO CLOUDINARY: ",err);
            throw err;
        }
        const productUpdated = await this.productRepository.updateProduct(resultProduct, supabase);
        return { success: true, data: productUpdated } as ProductServiceResponse;
    }

    private async deleteProduct(productId: number|{id: number}){
        const id = typeof productId === "number" ? {id: productId} : productId;
        const {supabase} = await authenticateAdmin();
        const resultProduct = await this.validateBody(DeleteProductSchema, id);
        
        try{
            const productDeleted = await this.productRepository.deleteProduct(resultProduct.id, supabase);
            return { success: true, data: productDeleted } as ProductServiceResponse;
        }catch(err){
            console.log("ERROR DELETING PRODUCT: ",err);
            throw err;
        }
    }
    private async uploadThumbnail(imageUrl: string){
        const result = await cloudinary.uploader.upload(imageUrl, {folder: "thumbnails"})
        return result;
    }
    private async uploadExtraImages(imageUrls: string[]|undefined|undefined[]){

        if(!imageUrls){
            return [];
        }
        const results = await Promise.all(imageUrls.map(imageUrl=>{
            if(!imageUrl || imageUrl === "null_image"){
                return {secure_url: "null_image"};
            }
            const result = cloudinary.uploader.upload(imageUrl, {folder: "extra_images"})
            return result;
        }))
        return results;
    }
    private async validateBody<T extends AddProductType | UpdateProductType | DeleteProductType>(schema: z.ZodType<T>, body: Product | {id: number}): Promise<T>{
        const resultProduct = schema.safeParse(body); 
        if (!resultProduct.success) {
            throw { code: 400, error: resultProduct.error.message } as ProductServiceError;//Should handle this from frontend
        }
        return resultProduct.data;
    }
}

export default new ProductService() ;
