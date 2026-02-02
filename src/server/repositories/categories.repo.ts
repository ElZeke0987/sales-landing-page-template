import { Category } from "../table-types";
import { dbPool } from "../db";
import { AddCategoryType, CategoryType, UpdateCategoryType } from "../schemas/category.schema";
import { SupabaseClient } from "@supabase/supabase-js";

export class CategoriesRepository {
    constructor(){}
    async getAllCategories(supabase: SupabaseClient){
        const queryResult = await supabase.from("categories").select("*");
        if(queryResult.error){
            throw queryResult.error;
        }
        return queryResult.data;
    }
    async addCategory(category: AddCategoryType, supabase: SupabaseClient){
        const filteredPropsCategory = {
            name_id: category.name.toLowerCase().replace(/\s/g, "-"),
            name: category.name,
            //description: category.description,
        };

        const queryResult = await supabase.from("categories").insert(filteredPropsCategory);
        if(queryResult.error){
            throw queryResult.error;
        }
        return queryResult.data;
    }
    async updateCategory(category: UpdateCategoryType, supabase: SupabaseClient){



        const queryResult = await supabase.from("categories").update(category).eq("id", category.id);

        if(queryResult.error){
            throw queryResult.error;
        }
        return queryResult.data;
    }
}