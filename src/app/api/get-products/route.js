import { readCatalogs, fetchCatalogs, readNormalCatalog } from "@/serverMods/getCatalogs"

export async function GET(){
    
    if(process.env.IS_PRINTFUL=="t"){
        
        const publicCatalogDataJson=await readCatalogs("public")
        if(publicCatalogDataJson){
            return new Response(JSON.stringify(publicCatalogDataJson), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
        const {privateCatalogData, publicCatalogData}=await fetchCatalogs()
        return new Response(JSON.stringify(publicCatalogData), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }else if(process.env.IS_PRINTFUL=="f"){
        const publicCatalogDataJson=await readNormalCatalog()
        return new Response(JSON.stringify(publicCatalogDataJson), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
