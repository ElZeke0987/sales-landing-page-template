import ProductService  from "@/server/services/product.service";
import { updateNormalCatalog } from "@/serverMods/getCatalogs";

export async function POST(request) {
    const body = await request.json();
    try{
       // console.log("testing product to update in route: ",body);
        const response = await ProductService.updateProduct(body);
        console.log("testing response in route: ",response);
        return new Response(JSON.stringify(response));
    }catch(err){
        console.log("Error updating product ",err);
        return new Response(JSON.stringify(err), {status: 500});
    }
}