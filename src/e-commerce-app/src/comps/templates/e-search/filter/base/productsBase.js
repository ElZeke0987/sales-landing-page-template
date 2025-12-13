import { manualProductsInfo } from "../../../../../../../serverMods/manualProductsInfo";
import { IS_PRINTFULL_WEB } from "../../../../../../../globalVars/features";

const petProductFetch=async()=>{
    console.log("Fetching products")
    const response=await fetch("/api/get-products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data=await response.json()
    console.log("response result: ", data)
    return data
}
// --- Glosario de variables ---
// petProductFetch: Función asíncrona que realiza una petición GET a "/api/get-products" para obtener la lista de productos.
// response: Respuesta cruda de la petición fetch.
// data: Objeto resultado de parsear la respuesta a JSON, contiene los productos provenientes del backend.
// newProductList: Nueva lista de productos procesados a partir de los datos recibidos.
// manualProductsInfo: Array (definido más arriba) con la información manual de productos utilizada para enriquecer o actualizar los datos obtenidos de backend.
// prdInfo: Elemento individual de manualProductsInfo, contiene info manual de un producto.
// prd: Producto individual obtenido del backend que tiene coincidencia con el id de prdInfo.
// result: Propiedad de 'data' que contiene el array principal de productos retornado por la API.
export async function newProductList(state){
    const data=await petProductFetch()
    let newProductList;
    console.log("Process env printfull", IS_PRINTFULL_WEB)
    if(IS_PRINTFULL_WEB){
        newProductList=manualProductsInfo.map((prdInfo, i) => {
            // Busca si existe un producto obtenido del backend con el mismo nombre que el id del producto manual
            const prdExist = data.find(p => p.name.replace(/\s+/g, "-").toLowerCase() === prdInfo.id.toLowerCase());
            if (prdExist) {
                // Si hay match, pone la informacion manual de ese producto mas la conseguida desde la API directamente
                prdInfo.title=prdExist.name
                return{
                    extId: prdExist.external_id,
                    imgList: [{ imgUrl: `/images/products/${prdInfo.id}/${prdInfo.id}-preview.png` || prdExist.thumbnail_url, title: prdInfo.id }],
                    ...prdInfo,
                }
            }
        })
    }else{
        newProductList = data//.map((prdInfo, i)=>{
        //     if(prdInfo.external_id&&prdInfo.id&&prdInfo.thumbnail_url){
        //         return{
        //                 extId: prdExist.external_id,
        //                 imgList: [{ imgUrl: `/images/products/${prdInfo.id}/${prdInfo.id}-preview.png` || prdExist.thumbnail_url, title: prdInfo.id }],
        //                 ...prdInfo,
        //             }
        //     }
        // })
    }
    console.log("new product list", newProductList)
    if(state){
        state(newProductList)
        return
    }
   return newProductList
}
