
export const filterLists = {
    category: []
}
export const fetchFilters=()=>{
    fetch("/api/get-filters")
    .then(res => res.json())
    .then(data => {
        console.log("data test", data)
        filterLists.category = data.category
    })
    .catch(error => {
        console.error("Error fetching filters:", error)
    })
}
