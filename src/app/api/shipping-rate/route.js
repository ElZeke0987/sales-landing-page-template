

export async function POST(req){
    const cartItemIds=await req.json();
    const productResponses = [];
    for (const item of cartItemIds.itemsIdsToBeProccesed) {
        const product = global.privateCatalogData.find(product => product.external_id === item.extId);

        const res = await fetch(`https://api.printful.com/store/products/${product.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.PRINTFUL_API_KEY}`,
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        productResponses.push(data.result.sync_variants);
    }
    productResponses.forEach(variants=>variants.forEach(variant=>console.log("nombre: ", variant.name, " variantId: ", variant.variant_id)))
    return new Response(JSON.stringify({shippingRate: 10}), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}
   
