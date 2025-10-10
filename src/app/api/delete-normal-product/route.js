import { removeNormalCatalog } from "../../../serverMods/getCatalogs";
export async function POST(request) {
    const { id } = await request.json();
    const data = await removeNormalCatalog(id);
    return Response.json({newCatalog: data});
}