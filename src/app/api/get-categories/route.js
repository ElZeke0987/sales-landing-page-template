import { CategoriesService } from "../../../server/services/categories.service";


export async function GET() {
    const categoriesService = new CategoriesService();
    const categories = await categoriesService.getAllCategories();
    console.log("Categories",categories)
    if (!categories) {
        return Response.json({ error: "Categories not found" }, { status: 404 });
    }
    return Response.json(categories)
}