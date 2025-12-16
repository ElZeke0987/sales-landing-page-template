"use client"
import { useState, useEffect, useRef } from "react";
import CustomInputFile from "./modComps/customInputFile";
export default function AddProduct(){
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [external_id, setExternal_id] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [category, setCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [logoImages, setLogoImages] = useState([]);
    const [extraImages, setExtraImages] = useState([]);
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
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/get-categories');
            const data = await response.json();
            setCategoryList(data);
        };
        console.log("categoryList", categoryList)
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
                desc,
                external_id,
                category,
                logoImageUrl: logoImages[0].url,
                extraImages,
            }),
        }); 
        const data = await response.json();
        setIsAdding(false);
    }
    
    return <div className="dev-panel-add-product">
        
        {isAdding&&<>
            <input type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
            <input type="text" placeholder="Price" value={price} onChange={handlePriceChange}/>
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
                    <option key={category.val} value={category.val} title={category.val}>
                        {category.title}
                    </option>
                ))}
            </select>
            
            
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