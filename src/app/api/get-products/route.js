const API_KEY= process.env.PRINTFUL_API_KEY
import {catalogData} from "../dataSave"

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
    global.catalogData = data
    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export async function GET(){
    if(catalogData){
        console.log("Returning cached catalog data")
        return new Response(JSON.stringify(catalogData), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    console.log("Fetching catalog data")
    const data = await onlyWhenNeeded()
    return data
}
