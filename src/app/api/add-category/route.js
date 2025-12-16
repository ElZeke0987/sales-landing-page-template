import { addCategory } from "../../../serverMods/modFilters";
export async function POST(request) {
    const body = await request.json();
    const { val, title } = body;
    await addCategory({val, title, act: false})
    return new Response(JSON.stringify({ val, title, act: false }));
}