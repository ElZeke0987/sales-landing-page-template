import { Category } from "../table-types";
import { dbPool } from "../db";

export class CategoriesRepository {
    constructor(){}
    async getAllCategories(){
        const queryResult = await dbPool.query("SELECT * FROM categories");
        return queryResult.rows;
    }
    async addCategory(category: Category){
        const queryResult = await dbPool.query("INSERT INTO categories (name_id, name, act) VALUES ($1, $2, $3)", [category.name_id, category.name, category.act]);
        return queryResult.rows;
    }
}