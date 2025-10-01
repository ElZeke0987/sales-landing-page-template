"use client"
import { useState } from "react";
export default function ItemProduct({product}) {

    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);

    async function updateProduct(){
        setIsEditing(false);
        if(!name&&!price){
            alert("Name and price wasn't written");
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
            }),
        });
        const data = await response.json();
        setIsEditing(false);
    }
    
    return <li>
        {isEditing?<div>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            {product.price?<input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}/>:<div>Sin precio local</div>}
            <button onClick={updateProduct}>Save</button>
        </div>:
        <div className="dev-panel-product">
            <img src={product.thumbnail_url} alt={product.name} />
            <h2>{name}</h2>
            <p>{price}</p>
        </div>}
        <div>
            <button onClick={()=>setIsEditing(!isEditing)} className={"dev-panel-button "+isEditing?"dev-panel-button-active":""}>{isEditing?"Cancel":"Update"}</button>
            <button>Delete</button>
        </div>
    </li>;
}