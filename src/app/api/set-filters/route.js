import { writeFilterToJson } from "../../../serverMods/modFilters";

export async function POST(request) {
    writeFilterToJson();
    return new Response("Filters updated successfully");
}
