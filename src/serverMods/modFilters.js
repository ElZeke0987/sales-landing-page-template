import { manualProductsInfo } from "./manualProductsInfo.js"

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

        filterListToSave.category.push({...newCategory, title: titleCategory})
    }
}

function writeFileOfFiltersSync(newFilterList){
    if (fs.existsSync(filterJsonPath)) {
        try {

            console.log('FilterList is correct, writing to file...');
            fs.writeFileSync(filterJsonPath, JSON.stringify(newFilterList, null, 2));
           
        } catch (error) {
            console.log('Error writing filterList to file', error);
        }
    } else {
        console.log('File does not exist, writing filterList to file...');
        fs.writeFileSync(filterJsonPath, JSON.stringify(filterListToSave, null, 2));
    }
}

export const writeFilterToJson = async() => {
    processManualProductsInfo()
    console.log(" processed filters: ", productsFiltersProcessed)
    await iterateManualProductsInfo(productsFiltersProcessed)
    writeFileOfFiltersSync(filterListToSave)
}

export const getFilterVarsJson=async()=>{
    
    const filterJson = fs.readFileSync(filterJsonPath, 'utf-8');
    const filterVars = JSON.parse(filterJson);
    console.log("FilterList: ", filterVars);
    return filterVars;
}

export const addCategory=async(item)=>{
    const oldFilterList=await getFilterVarsJson()
    console.log("oldFilterList", oldFilterList)
    const newFilterList={
        ...oldFilterList,
        category: [...oldFilterList.category, item]
    }
    await writeFileOfFiltersSync(newFilterList)
}