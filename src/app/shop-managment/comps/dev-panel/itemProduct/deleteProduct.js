export async function deleteProduct(id){
    console.log("deleting product", id)
    const response = await fetch('/api/delete-normal-product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
            id,
        }),
    }); 
    const data = await response.json();
    return data;
}
