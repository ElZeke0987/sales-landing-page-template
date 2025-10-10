export async function deleteProduct(id){
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
