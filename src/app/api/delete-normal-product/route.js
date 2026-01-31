import ProductService from "@/server/services/product.service";
export async function POST(request) {
    const { id } = await request.json();
    const data = await ProductService.deleteProduct(id);
    return Response.json({success: data.success, data: data.data});
}