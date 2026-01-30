import { addNormalCatalog } from "@/serverMods/getCatalogs";
export async function POST(request) {
    const { name, price, desc, category, logoImageUrl, extraImages} = await request.json();
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
        description: desc,
        videos: [],
        tags: [],
        createdAt: "",
        updatedAt: "",
        thumbnail_url: logoImageUrl,
        extraImages: [{id: 0, name: "catalog-logo",url: logoImageUrl}, extraImages],
    });
    return Response.json(data);
}