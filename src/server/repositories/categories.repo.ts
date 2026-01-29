import { Category } from "../table-types";
import { dbPool } from "../db";
import { AddCategoryType, CategoryType, UpdateCategoryType } from "../schemas/category.schema";

export class CategoriesRepository {
    constructor(){}
    async getAllCategories(){
        const queryResult = await dbPool.query("SELECT * FROM categories");
        return queryResult.rows;
    }
    async addCategory(category: AddCategoryType){
        const queryResult = await dbPool.query("INSERT INTO categories (name_id, name) VALUES ($1, $2)", [category.name_id, category.name]);
        return queryResult.rows;
    }
    async updateCategory(category: UpdateCategoryType){
        const queryResult = await dbPool.query("UPDATE categories SET name = $1, name_id = $2 WHERE id = $3", [category.name, category.name_id, category.id]);
        return queryResult.rows;
    }
}