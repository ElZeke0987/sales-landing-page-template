import { readCatalogs, fetchCatalogs } from "@/serverMods/getCatalogs"

export async function GET(){
    
    const publicCatalogDataJson=await readCatalogs("public")
    if(publicCatalogDataJson){
        return new Response(JSON.stringify(publicCatalogDataJson), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    const {privateCatalogData, publicCatalogData}=await fetchCatalogs()
    console.log("privateCatalogData", privateCatalogData)
    console.log("publicCatalogData", publicCatalogData)
    return new Response(JSON.stringify(publicCatalogData), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
