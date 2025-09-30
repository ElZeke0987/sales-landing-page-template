

export const filterLists = {
    category: []
}
let actuallySendedFetch=false
export const fetchFilters=async(setCategory)=>{
    if(actuallySendedFetch)return;
    actuallySendedFetch=true;
    const res = await fetch("/api/get-filters")
    const data = await res.json()
    console.log("data test", data)
    setCategory(data.category)
    return data.category
}
