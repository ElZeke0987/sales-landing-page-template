import CategoriesService from "@/server/services/categories.service";

export async function GET(request: Request) {
    const categories = await CategoriesService.getAllCategories();
    
    
    return new Response(JSON.stringify(categories));
}
