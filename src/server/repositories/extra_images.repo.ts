import { ExtraImagesType } from "../schemas/extra_images.schema";
import { dbPool } from "../db";


export class ExtraImagesRepo{
    async addExtraImage(extraImage: ExtraImagesType) {
        const result = await dbPool.query("INSERT INTO extra_images (product_id, image_url) VALUES ($1, $2)", [extraImage.product_id, extraImage.image_url]);
        return result.rows;
    }
    async updateExtraImage(extraImage: ExtraImagesType) {
        const result = await dbPool.query("UPDATE extra_images SET image_url = $1 WHERE product_id = $2", [extraImage.image_url, extraImage.product_id]);
        return result.rows;
    }
    async deleteExtraImageRecord(extraImageId: number) {
        const result = await dbPool.query("DELETE FROM extra_images WHERE id = $1", [extraImageId]);
        return result.rows;
    }
}