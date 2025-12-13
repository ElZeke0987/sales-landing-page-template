
import { updateNormalCatalog } from "@/serverMods/getCatalogs";

export async function POST(request) {
    const body = await request.json();
    const { name, desc, price, id } = body;
    const response = await updateNormalCatalog({name, desc, price, id});
    return new Response(JSON.stringify(response));
}