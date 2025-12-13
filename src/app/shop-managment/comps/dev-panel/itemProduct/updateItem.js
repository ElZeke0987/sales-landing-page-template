

"use client"
import { useState } from "react";

export default function UpdateItem({product, setIsEditing, isEditing}){
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [desc, setDesc] = useState(product.description);
    async function updateProduct(){
        setIsEditing(false);
        if(!name&&!price){
            alert("Name and/or price wasn't written / No escribiste el nombre y/o el precio");
            return;
        }
        const response = await fetch('/api/change-normal-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                price,
                external_id: product.external_id,
                id: product.id,
                desc,
            }),
        }); 
        const data = await response.json();
        setIsEditing(false);
    }
   
    
    return <>
        {isEditing?
        <div className="update-product-container">
            <div className="dev-panel-update-product">
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                <textarea value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>
                {product.price?<input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}/>:<div>Sin precio local</div>}
                
            </div>
            <button className="update-save-button" onClick={updateProduct}>Save</button>
        </div>:
        <div className="dev-panel-product">
            <img src={product.thumbnail_url} alt={product.name} />
            <h2>{name}</h2>
            <p>{price}</p>
        </div>
        }
    </>
}
