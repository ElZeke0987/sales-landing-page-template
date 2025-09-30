import { manualProductsInfo } from "./manualProductsInfo.js"
export const filterLists={
    category: [/*
        {
            val: "oversize-shirts",
            txt: "Remeras Oversize",
            act: false,
        },
        {
            val: "baggy-pant",
            txt: "Pantalones Baggy",
            act: false,
        },
        {
            val: "sport-shirts",
            txt: "Remeras Deportivas",
            act: false,
        },*/
    ]
}

let filterListToSave={
    category: []
}




import fs from "fs"
import path from "path"
const filterJsonPath = "D:/@ARCHIVOS_USUARIO@/Desktop/e-commerce-ce/src/serverMods/filterJson.json"

export function askInput(question) {
    return new Promise((resolve) => {
        console.log(question);
        process.stdin.once('data', (data) => {


            console.log("response to asked input stdin.once", data.toString().trim())
            resolve(data.toString().trim());
        });
    });
}

let productsFiltersProcessed=[]

function processManualProductsInfo(){
    const set = new Set();
    productsFiltersProcessed=[]
    manualProductsInfo.forEach(prd => {
        console.log("processing manual products info: ", prd);
        if(!set.has(prd.val)){
            set.add(prd.val);
            productsFiltersProcessed.push({
                val: prd.val,
                act: false
            })
        }
    })
}

async function iterateManualProductsInfo(productsFiltersProcessed){
    filterListToSave.category=[]
    for(let i=0; i<productsFiltersProcessed?.length; i++){
        const prd=productsFiltersProcessed[i]
        const newCategory={
            val: prd.val,
            act: false,
        }
        let titleCategory=""
        if(process.env.NODE_ENV === "development"){
            titleCategory=await askInput(`Ingrese el nombre de la categoria ${prd.val}: `);
        }
        filterListToSave.category.push({...newCategory, title: titleCategory})
    }
}

export const writeFilterToJson = async() => {
    processManualProductsInfo()
    console.log(" processed filters: ", productsFiltersProcessed)
    await iterateManualProductsInfo(productsFiltersProcessed)
    if (fs.existsSync(filterJsonPath)) {
        try {

            console.log('FilterList is correct, writing to file...');
            fs.writeFileSync(filterJsonPath, JSON.stringify(filterListToSave, null, 2));
           
        } catch (error) {
            console.log('Error writing filterList to file', error);
        }
    } else {
        console.log('File does not exist, writing filterList to file...');
        fs.writeFileSync(filterJsonPath, JSON.stringify(filterListToSave, null, 2));
    }
}

export const getFilterVarsJson=async()=>{

    console.log("testing dirname", __dirname, )

    
    const filterJson = fs.readFileSync(filterJsonPath, 'utf-8');
    const filterVars = JSON.parse(filterJson);
    console.log("FilterList: ", filterVars);
    return filterVars;
}