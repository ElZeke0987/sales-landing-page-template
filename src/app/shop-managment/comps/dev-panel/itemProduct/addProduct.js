"use client"
import { useState, useEffect, useRef } from "react";
import CustomInputFile from "./customInputFile";
export default function AddProduct(){
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [external_id, setExternal_id] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [category, setCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [logoImages, setLogoImages] = useState([1]);
    const [extraImages, setExtraImages] = useState([2]);
    function handleNameChange(event) {
        setName(event.target.value);
    }
    function handlePriceChange(event) {
        setPrice(event.target.value);
    }
    function handleCategoryChange(event) {
        setCategory(event.target.value);
    }
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/get-categories');
            const data = await response.json();
            setCategoryList(data);
        };
        fetchCategories();
    }, []);
    async function addProduct(){
        const response = await fetch('/api/add-normal-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                price,
                external_id,
                category,
                imageUrl: logoImages[0].url,
                extraImages: extraImages.map((image) => image.url),
            }),
        }); 
        const data = await response.json();
        setIsAdding(false);
    }
    
    return <div className="dev-panel-add-product">
        <div className="dev-panel-add-product-buttons">
            {isAdding?
            <>
            <button className="dev-panel-button cancel-button" onClick={()=>setIsAdding(!isAdding)}>Cancel</button>
            <button className="dev-panel-button" onClick={addProduct}>Add</button>
            
            </>:
            <button className="dev-panel-button" onClick={()=>setIsAdding(!isAdding)}>Add Product</button>
            }
        </div>
        {isAdding&&<>
            <input type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
            <input type="text" placeholder="Price" value={price} onChange={handlePriceChange}/>
            <div className="add-product-logo">
                <p>Logo / Preview</p>
                <CustomInputFile images={logoImages} setImages={setLogoImages}/>
            </div>
            <div className="add-product-extra-images flex">
                <p>Extra Images</p>
                <CustomInputFile images={extraImages} setImages={setExtraImages} multipleImgs={true}/>
            </div>
            

            <select value={category} onChange={handleCategoryChange} className="dev-panel-select">
                <option value="">-- Select Category --</option>
                {categoryList.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
            
            
        </>}
    </div>;
}