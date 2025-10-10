export async function GET() {
    return Response.json([
        { id: 1, name: 'Electronics' },
        { id: 2, name: 'Clothing' },
        { id: 3, name: 'Home & Garden' },
        { id: 4, name: 'Toys & Games' },
        { id: 5, name: 'Beauty & Personal Care' },
    ]);
}