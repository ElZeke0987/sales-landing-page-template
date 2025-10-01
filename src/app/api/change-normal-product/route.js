
import { updateNormalCatalog } from "@/serverMods/getCatalogs";

export async function POST(request) {
    const body = await request.json();
    const { name, price, external_id } = body;
    const response = await updateNormalCatalog({name, price, external_id});
    return new Response(JSON.stringify(response));
}