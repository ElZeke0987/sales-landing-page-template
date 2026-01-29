import z from "zod";
import { CategoriesRepository } from "../repositories/categories.repo";
import { Category } from "../table-types";
import { CategoryType, CategorySchema, AddCategoryType, AddCategorySchema, UpdateCategoryType, UpdateCategorySchema } from "../schemas/category.schema";

interface CategoriesServiceError {
    code: number;
    error: string;
}

export class CategoriesService{

    constructor(private categoriesRepository: CategoriesRepository){
        this.categoriesRepository = categoriesRepository ?? new CategoriesRepository();
    }  
    async getAllCategories(){

        const categories = await this.categoriesRepository.getAllCategories();
        return categories;
    }
    async addCategory(category: Category){
        const resultCategory: AddCategoryType = await this.validateBody(AddCategorySchema, category);
        return this.categoriesRepository.addCategory(resultCategory);
    }
    async updateCategory(category: Category){
        const resultCategory: UpdateCategoryType = await this.validateBody(UpdateCategorySchema, category);
        return this.categoriesRepository.updateCategory(resultCategory);
    }
    private async validateBody<T extends AddCategoryType | UpdateCategoryType>(schema: z.ZodType<T>, body: Category): Promise<T>{
        const resultCategory = schema.safeParse(body); 
        if (!resultCategory.success) {
            throw { code: 400, error: resultCategory.error.message } as CategoriesServiceError;//Should handle this from frontend
        }
        return resultCategory.data;
    }
}