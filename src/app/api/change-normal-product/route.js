import { ProductService } from "@/server/services/product.service";
import { updateNormalCatalog } from "@/serverMods/getCatalogs";

export async function POST(request) {
    const body = await request.json();
    try{
        const response = await ProductService.updateProduct(body);
        return new Response(JSON.stringify(response));
    }catch(err){
        return new Response(JSON.stringify(err), {status: err.code});
    }
}