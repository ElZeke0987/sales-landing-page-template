"use client"
import { useState, useEffect, useRef } from "react";
import CustomInputFile from "./modComps/customInputFile";
import { fetchCategories } from "@/globalMods/categoryBase";
import { uploadImageToCloudinary } from "./modComps/uploadImage";

export default function AddProduct({categoryList, setter}){
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [external_id, setExternal_id] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [category, setCategory] = useState('');
    const [logoImages, setLogoImages] = useState('');
    const [extraImages, setExtraImages] = useState([]);
    const [stock, setStock] = useState(0);
    const [isSending, setIsSending] = useState(false);

    useEffect(()=>{
        console.log("logoImages",logoImages)
    },[logoImages])

    function handleStockChanges(event){
        setStock(event.target.value);
    }
    function handleNameChange(event) {
        setName(event.target.value);
    }
    function handlePriceChange(event) {
        setPrice(event.target.value);
    }
    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }
    function handleDescChange(event) {
        setDesc(event.target.value);
    }

    async function addProduct(){
        setIsSending(true);
        if(isSending){return}
        const searchCategoryId = categoryList.find((categoryToSearch) => categoryToSearch.name_id === category);
        console.log("searchCategoryId", searchCategoryId, categoryList)
        const logoUploaded = await uploadImageToCloudinary(logoImages);
        console.log("logoUploaded", logoUploaded)
        const product = {
                name,
                price: parseInt(price),
                description: desc,
                external_id,
                category_id: parseInt(searchCategoryId.id),
                thumbnail_url: logoUploaded.secure_url,
                extra_images: extraImages,
                stock: parseInt(stock),
                outstanding: false
            }
        const response = await fetch('/api/add-normal-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(product),
        }); 
        const data = await response.json();
        setIsAdding(false);
        setIsSending(false);
        setter(products=>[...products, product]);
    }
    
    return <div className={`dev-panel-add-product`}>
        
        {isAdding&&<div className="dev-on-adding fixed top-0 left-0 right-0 bottom-0 z-50 flex">
            <input className="w-full border border-gray-300 rounded name-input" required title="Name" type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
            <div className="add-basic-fields flex">
                
                <input className="w-full border border-gray-300 rounded" required title="Price" type="number" placeholder="Price" value={price} onChange={handlePriceChange}/>
                <input className="w-full border border-gray-300 rounded" required title="Stock" type="number" placeholder="Stock" value={stock} onChange={handleStockChanges}/>
            </div>

            <textarea className="dev-panel-desc-textarea w-full" required placeholder="Description" value={desc} onChange={handleDescChange}/>
            <select value={category} onChange={handleCategoryChange} className="dev-panel-select">
                <option value="">-- Select Category --</option>
                {categoryList.map((category) => (
                    <option key={category.name_id} value={category.name_id} title={category.name_id}>
                        {category.name||category.name_id}
                    </option>
                ))}
            </select>
            <div className="add-product-logo">
                <p>Logo / Preview</p>
                <CustomInputFile images={logoImages} setImages={setLogoImages}/>
            </div>
            <div className="add-product-extra-images flex flex-col">
                <p>Extra Images</p>
                <CustomInputFile images={extraImages} setImages={setExtraImages} multipleImgs={true}/>
            </div>
            

            
            
            <div className="dev-panel-add-product-buttons">
                <button className={"dev-panel-button cancel-button " + (isSending?"disabled":"")} onClick={()=>setIsAdding(!isAdding)}>Cancel</button>
                <button className={"dev-panel-button " + (isSending?"disabled":"")} onClick={   addProduct}>{isSending?"Sending...":"Add"}</button>
            </div>
            
        </div>}
        <div className="dev-panel-add-product-buttons">

            <button className="dev-panel-button" onClick={()=>setIsAdding(!isAdding)}>Add Product</button>
            
        </div>
    </div>;
}