const API_KEY= process.env.PRINTFUL_API_KEY

import fs from "fs"
import path from "path"

export async function onlyWhenNeeded(){
    const response=await fetch("https://api.printful.com/store/products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        }
    })
    const data=await response.json()
    if (data.code==429){//En Printful API, es error de demasiadas peticiones

        const errorMsg = `[${new Date().toISOString()}] Error al obtener los productos. Código: ${data.code}\n`;
        console.log(errorMsg)
        const logPath = path.resolve(process.cwd(), "error-log.txt");
        fs.appendFile(logPath, errorMsg, (err) => {
            if (err) console.error('Error al escribir en el archivo de log:', err);
        });

        return new Response(JSON.stringify({message: "Error al obtener los productos"}), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    console.log(
        "Estado de la petición:", data.code === 200 ? "Éxito" : `Error (${data.code})`,
        "| Cantidad de productos en catálogo:", Array.isArray(data.result) ? data.result.length : 0
    );
    // Use global assignment to avoid errors when assigning to imported variable
    global.catalogData = data.result.map((prd)=>{
        /*
        Explicación de las variables seleccionadas para el objeto de producto (catalogData):

        - external_id: Identificador externo generado por Printful para este producto (string). 
        Es esencial para interactuar con la API de Printful y realizar operaciones como obtener detalles, 
        actualizar o eliminar el producto.
        - name: Nombre del producto (string). 
        Proporciona la referencia principal y visible para el usuario.
        - thumbnail_url: URL de la imagen miniatura principal del producto (string). 
        Se utiliza para mostrar una representación visual rápida en catálogos o listados.

        Variables ocultas/no seleccionadas deliberadamente:
        - synced, is_ignored: Se excluyen para simplificar el objeto. 
        Estos campos son útiles para la administración interna (p.ej., saber si el producto está sincronizado o debe mostrarse), 
        pero no son relevantes para el consumo general de la app ni para el usuario final.
        - variants, retail_price, currency, files, options, is_discontinued, description, categories, tags: 
        Estas propiedades pueden ser relevantes dependiendo del contexto (como mostrar variantes, precio, o descripciones extendidas), 
        pero se omiten en la respuesta principal para mantener el objeto ligero y enfocado en los datos esenciales requeridos por el 
        frontend. 
        Si alguna funcionalidad futura requiere detalles adicionales, pueden recuperarse bajo demanda haciendo otra petición a la API 
        de Printful.

        En resumen, se incluyen solo las propiedades básicas y visuales críticas para mantener eficiencia y simplicidad en la transferencia 
        y manejo de datos.
        */

        return {
            thumbnail_url: prd.thumbnail_url,
            external_id: prd.external_id,
            name: prd.name,
        }
    })
    return new Response(JSON.stringify(global.catalogData), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export async function GET(){

    if(global.catalogData){
        console.log("Returning cached catalog data")
        return new Response(JSON.stringify(global.catalogData), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    console.log("Fetching catalog data")
    const data = await onlyWhenNeeded()
    return new Response(data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
