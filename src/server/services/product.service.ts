import { ProductRepository } from "../repositories/products.repo";
import { Product } from "../table-types";
import { AddProductSchema, UpdateProductSchema, UpdateProductType, AddProductType } from "../schemas/product.schema";
import { ZodSafeParseResult } from "zod";


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
    async addProduct(body: AddProductType) {
        // TODO: Implementar lógica para agregar un producto

        const resultProduct: ZodSafeParseResult<AddProductType> = AddProductSchema.safeParse(body); 

        if (!resultProduct.success) {
            throw { code: 400, error: resultProduct.error.message } as ProductServiceError;//Should handle this from frontend
        }

        const productAdded = await this.productRepository.addProduct(resultProduct.data);
        return { success: true, data: productAdded } as ProductServiceResponse;
    }
    async updateProduct(body: Product) {
        // TODO: Implementar lógica para actualizar un producto
        console.log("testing product to update in service: ",body);
        const resultProduct: ZodSafeParseResult<UpdateProductType> = UpdateProductSchema.safeParse(body); //Some values are optional, it refines the schema to ensure at least one value is provided
        if (!resultProduct.success) {
            throw { code: 400, error: resultProduct.error.message } as ProductServiceError;//Should handle this from frontend

        }
        
        const productUpdated: UpdateProductType = await this.productRepository.updateProduct(resultProduct.data);
        return { success: true, data: productUpdated } as ProductServiceResponse;
    }
}

export default new ProductService() ;
