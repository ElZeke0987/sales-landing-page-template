

"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import CustomInputFile from "./modComps/customInputFile";
import { deleteProduct } from "./deleteProduct";
export default function UpdateItem({product, setIsEditing, isEditing, setter}){
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [desc, setDesc] = useState(product.description);
    const [updatedThumbnail, setUpdatedThumbnail] = useState(product.thumbnail_url);
    const [updatedExtraImages, setUpdatedExtraImages] = useState(product.extra_images||[]);
    const [stock, setStock] = useState(product.stock);
    console.log("updating product", product)
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
                stock,
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
   
    async function handleDeleteProduct(){
        const data = await deleteProduct(product.id);
        setIsEditing(false);
        setter(true);
    }

    useEffect(()=>{
        console.log("updated thumbnail", updatedThumbnail)
        console.log("updated extra images", updatedExtraImages)
    },[updatedThumbnail, updatedExtraImages])
    return <>
        {isEditing?
        <div className="update-product-container">
            <h2>Thumbnail</h2>
            <CustomInputFile images={updatedThumbnail} setImages={setUpdatedThumbnail}/>
            <h2>Extra Images</h2>
            <CustomInputFile images={updatedExtraImages} setImages={setUpdatedExtraImages} multipleImgs={true}/>
            <div className="dev-panel-update-product ">
                <input name="product-name" type="text" value={name} onChange={(e)=>setName(e.target.value)} autoComplete="off"/>
                <input name="product-price"  type="number" value={price} onChange={(e)=>setPrice(e.target.value)} autoComplete="off"/>
                <input name="product-stock" type="number" value={stock} onChange={(e)=>setStock(e.target.value)} autoComplete="off"/>
            </div>
            <textarea name="product-description" value={desc} onChange={(e)=>setDesc(e.target.value)} autoComplete="off"></textarea>
            <div className="update-product-buttons">
                <button className="update-save-button" onClick={updateProduct}>Save</button>
                <button className="update-cancel-button" onClick={()=>setIsEditing(!isEditing)}>Cancel</button>
                
            </div>
            <button className="update-delete-button" onClick={handleDeleteProduct}>Delete Product</button>
        </div>:
        <div className="dev-panel-product">
            
            <h2>{name}</h2>
            <p>$ {price} | Stock: {stock}</p>
            
        </div>
        }
    </>
}
