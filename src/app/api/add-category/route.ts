import { addCategory } from "@/serverMods/modFilters";
import categoriesService from "@/server/services/categories.service";

export async function POST(request: Request) {
    const body = await request.json();
    try{
        const response = await categoriesService.addCategory(body)
        return new Response(JSON.stringify(response), {status: 200});
    }catch(err){
        console.log("Error adding category ",err);
        return new Response(JSON.stringify(err), {status: 500});
    }
}