import { addCategory } from "../../../serverMods/modFilters";
export async function POST(request) {
    const body = await request.json();
    const { name } = body;
    await addCategory(name)
    return new Response(JSON.stringify({ name }));
}