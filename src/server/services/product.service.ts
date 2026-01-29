import { ProductRepository } from "../repositories/products.repo";
import { Product } from "../table-types";
import { AddProductSchema, UpdateProductSchema, UpdateProductType, AddProductType } from "../schemas/product.schema";
import { ZodSafeParseResult } from "zod";
import { z } from "zod";
import cloudinary from "../media.config";

interface ProductServiceResponse {
    success: boolean;
    data?: any;
    error?: string;
}

interface ProductServiceError {
    code: number;
    
    error: string;
}


class ProductService {
    constructor(private productRepository: ProductRepository = new ProductRepository() ) {}
    async getAllProducts() {
        return this.productRepository.getAllProducts();
    }
    async addProduct(body: Product) {
        // TODO: Implementar lógica para agregar un producto

        const resultProduct = await this.validateBody(AddProductSchema,body);
        const thumbnail = await this.uploadThumbnail(resultProduct.thumbnail_url);
        resultProduct.thumbnail_url = thumbnail.secure_url;
        const extraImages = await this.uploadExtraImages(resultProduct.extra_images);
        resultProduct.extra_images = extraImages.map(extraImage=>extraImage.secure_url);
        const productAdded = await this.productRepository.addProduct(resultProduct);
        return { success: true, data: productAdded } as ProductServiceResponse;
    }
    async updateProduct(body: Product) {
        // TODO: Implementar lógica para actualizar un producto
        
        const resultProduct = await this.validateBody(UpdateProductSchema,body);
        try{
            if(resultProduct.thumbnail_url){
                const thumbnail = await this.uploadThumbnail(resultProduct.thumbnail_url);
                console.log("testing thumbnail uploaded in service: ",thumbnail);
                resultProduct.thumbnail_url = thumbnail.secure_url;
            }
            resultProduct.extra_images?.map(async extraImage=>{
                if(!extraImage){
                    return;
                }
                const extraImageResult = await this.uploadExtraImages([extraImage]);
                console.log("testing extra image uploaded in service: ",extraImageResult);
                resultProduct.extra_images = extraImageResult.map(extraImage=>extraImage.secure_url);
            })
        }catch(err){
            console.log("ERROR UPLOADING IMAGES TO CLOUDINARY: ",err);
            throw err;
        }
        const productUpdated = await this.productRepository.updateProduct(resultProduct);
        return { success: true, data: productUpdated } as ProductServiceResponse;
    }


    private async uploadThumbnail(imageUrl: string){
        console.log("testing thumbnail to upload in service: ",imageUrl.slice(0, 15));
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
    private async validateBody<T extends AddProductType | UpdateProductType>(schema: z.ZodType<T>, body: Product): Promise<T>{
        const resultProduct = schema.safeParse(body); 
        if (!resultProduct.success) {
            throw { code: 400, error: resultProduct.error.message } as ProductServiceError;//Should handle this from frontend
        }
        return resultProduct.data;
    }
}

export default new ProductService() ;
