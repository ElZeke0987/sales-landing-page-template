import z from "zod";
import { CategoriesRepository } from "../repositories/categories.repo";
import { Category } from "../table-types";
import { CategoryType, CategorySchema, AddCategoryType, AddCategorySchema, UpdateCategoryType, UpdateCategorySchema } from "../schemas/category.schema";
import { authenticateAdmin } from "@/server/middleware/auth";

interface CategoriesServiceError {
    code: number;
    error: string;
}

class CategoriesService{

    constructor(private categoriesRepository: CategoriesRepository = new CategoriesRepository()){}  
    async getAllCategories(){
        try{
            const {supabase} = await authenticateAdmin()
            const categories = await this.categoriesRepository.getAllCategories(supabase);
            return categories;
        }catch(err){
            console.log("Error getting all categories", err);
            throw err;
        }
    }
    async addCategory(category: Category){
        try{
            const {supabase} = await authenticateAdmin()
            const resultCategory: AddCategoryType = await this.validateBody(AddCategorySchema, category);
            console.log("Ading this from back: ", category)
            return await this.categoriesRepository.addCategory(resultCategory, supabase);
        }catch(err){
            console.log("Error adding category", err);
            throw err;
        }
    }
    async updateCategory(category: Category){
        try{
            const {supabase} = await authenticateAdmin()
            const resultCategory: UpdateCategoryType = await this.validateBody(UpdateCategorySchema, category);
            return await this.categoriesRepository.updateCategory(resultCategory, supabase);
        }catch(err){
            console.log("Error updating category", err);
            throw err;
        }
    }
    private async validateBody<T extends AddCategoryType | UpdateCategoryType>(schema: z.ZodType<T>, body: Category): Promise<T>{
        const resultCategory = schema.safeParse(body); 
        if (!resultCategory.success) {
            throw { code: 400, error: resultCategory.error.message } as CategoriesServiceError;//Should handle this from frontend
        }
        return resultCategory.data;
    }
}

export default new CategoriesService()