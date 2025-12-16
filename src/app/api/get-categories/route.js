import { getFilterVarsJson } from "../../../serverMods/modFilters";

export async function GET() {
    const filterVarsJson=await getFilterVarsJson()
    return Response.json(filterVarsJson.category)
}