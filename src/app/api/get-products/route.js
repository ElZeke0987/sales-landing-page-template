import { fetchCatalogs } from "../../serverMods/getCatalogs"

export async function GET(){
    if(global.catalogData){
        console.log("Returning cached catalog data ")
        return new Response(JSON.stringify(global.catalogData), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    console.log("Fetching catalog data")
    const data = await fetchCatalogs()
    return new Response(data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
