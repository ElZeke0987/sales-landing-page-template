

"use client"
import { useState } from "react";
import Image from "next/image";
import CustomInputFile from "./modComps/customInputFile";
export default function UpdateItem({product, setIsEditing, isEditing}){
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [desc, setDesc] = useState(product.description);
    const [updatedThumbnail, setUpdatedThumbnail] = useState([product.thumbnail_url||""]);
    const [updatedExtraImages, setUpdatedExtraImages] = useState(["", "", ""]);
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
                description: desc,
                thumbnail_url: updatedThumbnail[0]?.url||"",
                extra_images: updatedExtraImages||[],
            }),
        }); 
        const data = await response.json();
        setIsEditing(false);
    }
   
    
    return <>
        {isEditing?
        <div className="update-product-container">
            <h2>Thumbnail</h2>
            <CustomInputFile images={updatedThumbnail} setImages={setUpdatedThumbnail}/>
            <h2>Extra Images</h2>
            <CustomInputFile images={updatedExtraImages} setImages={setUpdatedExtraImages} multipleImgs={true}/>
            <div className="dev-panel-update-product">
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                
                {product.price?<input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}/>:<div>Sin precio local</div>}
                
            </div>
            <textarea value={desc} onChange={(e)=>setDesc(e.target.value)}></textarea>
            <button className="update-save-button" onClick={updateProduct}>Save</button>
        </div>:
        <div className="dev-panel-product">
            
            <h2>{name}</h2>
            <p>{price}</p>
        </div>
        }
    </>
}
