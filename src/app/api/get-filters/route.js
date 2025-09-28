import { getFilterVarsJson } from "../../../serverMods/modFilters";

export async function GET(request) {
    const filterVarsJson = getFilterVarsJson();
    return new Response(JSON.stringify(filterVarsJson));
}
