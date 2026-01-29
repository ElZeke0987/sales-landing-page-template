
import { readCatalogs, fetchCatalogs } from "@/serverMods/getCatalogs"
import ProductService from "@/server/services/product.service"


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
        const products=await ProductService.getAllProducts()
        //console.log("products in api", products)
        return new Response(JSON.stringify(products), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
