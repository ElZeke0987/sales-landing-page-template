import { CategoriesRepository } from "../repositories/categories.repo";
import { Category } from "../table-types";

export class CategoriesService{
    constructor(private categoriesRepository: CategoriesRepository){
        this.categoriesRepository = categoriesRepository ?? new CategoriesRepository();
    }  
    async getAllCategories(){

        const categories = await this.categoriesRepository.getAllCategories();
        return categories;
    }
    async addCategory(category: Category){
        return this.categoriesRepository.addCategory(category);
    }
}