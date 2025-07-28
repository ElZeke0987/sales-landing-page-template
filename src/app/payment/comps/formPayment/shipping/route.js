export async function POST(req) {
    const body=await req.json()
    
    const response=await fetch("https://api.printful.com/shipping/rates", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify(body)
    })
    return new Response(JSON.stringify({message: "Hello World From Back End"}), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}