import { getFilterVarsJson, askInput, writeFilterToJson } from "../../../serverMods/modFilters";

export async function GET(request) {
    const filterVarsJson = await getFilterVarsJson();
    /*if(process.env.NODE_ENV === "development"){
        const change = await askInput("Do you wanna change filter names? (y/n)");
        if(change.toLowerCase()[0] === "y"||change.toLowerCase()[0] === "s"||filterVarsJson.category.length===0){
            if(filterVarsJson.category.length===0){
                console.log("FilterList is empty, writing to file...");
            }
            await writeFilterToJson();
            return new Response(JSON.stringify(filterVarsJson));
       }
    }*/
    
    return new Response(JSON.stringify(filterVarsJson));
}
