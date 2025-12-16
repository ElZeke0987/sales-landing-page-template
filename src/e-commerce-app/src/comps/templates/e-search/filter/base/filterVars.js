

export const filterLists = {
    category: []
}
let actuallySendedFetch=false
export const fetchCategories=async(setCategory)=>{
    if(actuallySendedFetch)return;
    actuallySendedFetch=true;
    const res = await fetch("/api/get-categories")
    const data = await res.json()
    console.log("data test", data)
    setCategory(data)
    return data
}
