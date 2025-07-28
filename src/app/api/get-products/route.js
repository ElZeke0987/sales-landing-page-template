const API_KEY= process.env.PRINTFUL_API_KEY
export async function GET(){
    const response=await fetch("https://api.printful.com/products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        }
    })
    console.log(response.result)
    return new Response(JSON.stringify(await response.json()), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
