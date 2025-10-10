import { addNormalCatalog } from "../../../serverMods/getCatalogs";
export async function POST(request) {
    const { name, price, category, imageUrl} = await request.json();
    const textual_id = name.toLowerCase().replace(/\s/g, "-");
    const data = await addNormalCatalog({
        name,
        price,
        
        external_id: "",
        id: textual_id,
        category,
        val: category,
        variants: 0,
        subcategory: "",
        brand: "",
        stock: 0,
        discount: 0,
        description: "",
        videos: [],
        tags: [],
        createdAt: "",
        updatedAt: "",
        thumbnail_url: imageUrl,
    });
    return Response.json(data);
}