"use client"
import { useState, useEffect, useRef } from "react";
import CustomInputFile from "./modComps/customInputFile";
import { fetchCategories } from "@/globalMods/categoryBase";

export default function AddProduct({categoryList}){
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [external_id, setExternal_id] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [category, setCategory] = useState('');
    const [logoImages, setLogoImages] = useState([]);
    const [extraImages, setExtraImages] = useState([]);
    const [stock, setStock] = useState(0);

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


        const searchCategoryId = categoryList.find((categoryToSearch) => categoryToSearch.name_id === category);
        console.log("searchCategoryId", searchCategoryId, categoryList)
        const response = await fetch('/api/add-normal-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                name,
                price: parseInt(price),
                description: desc,
                external_id,
                category_id: parseInt(searchCategoryId.id),
                thumbnail_url: logoImages[0].url,
                extra_images: extraImages,
                stock: parseInt(stock),
                outstanding: false
            }),
        }); 
        const data = await response.json();
        setIsAdding(false);
    }
    
    return <div className="dev-panel-add-product">
        
        {isAdding&&<>
            <input type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
            <input type="number" placeholder="Price" value={price} onChange={handlePriceChange}/>
            <textarea className="dev-panel-desc-textarea" placeholder="Description" value={desc} onChange={handleDescChange}/>
            <div className="add-product-logo">
                <p>Logo / Preview</p>
                <CustomInputFile images={logoImages} setImages={setLogoImages}/>
            </div>
            <div className="add-product-extra-images flex flex-col">
                <p>Extra Images</p>
                <CustomInputFile images={extraImages} setImages={setExtraImages} multipleImgs={true}/>
            </div>
            

            <select value={category} onChange={handleCategoryChange} className="dev-panel-select">
                <option value="">-- Select Category --</option>
                {categoryList.map((category) => (
                    <option key={category.name_id} value={category.name_id} title={category.name_id}>
                        {category.name||category.name_id}
                    </option>
                ))}
            </select>
            <input type="number" placeholder="Stock" value={stock} onChange={handleStockChanges}/>
            
            
        </>}
        <div className="dev-panel-add-product-buttons">
            {isAdding?
            <>
            <button className="dev-panel-button cancel-button" onClick={()=>setIsAdding(!isAdding)}>Cancel</button>
            <button className="dev-panel-button" onClick={addProduct}>Add</button>
            
            </>:
            <button className="dev-panel-button" onClick={()=>setIsAdding(!isAdding)}>Add Product</button>
            }
        </div>
    </div>;
}