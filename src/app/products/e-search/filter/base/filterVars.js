

export const filterLists = {
    category: []
}
let actuallySendedFetch=false
export const fetchCategories=async(setCategory)=>{
    if(actuallySendedFetch)return;
    actuallySendedFetch=true;
    const res = await fetch("/api/get-categories")
    const data = await res.json()

    const categories=data.map((item)=>{
        return{
            ...item,
            
            act: false
        }
    })

    console.log("data test", categories)
    setCategory(categories)
    return categories
}
