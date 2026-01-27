import { ProductRepository } from "../repositories/products.repo";
import { Product } from "../table-types";


export default class ProductService {
    constructor(private productRepository: ProductRepository) {
        this.productRepository = productRepository ?? new ProductRepository();
    }
    async getAllProducts() {
        return this.productRepository.getAllProducts();
    }
    async addProduct(product: Product) {
        // TODO: Implementar lógica para agregar un producto
        return this.productRepository.addProduct(product);
    }

}
    
