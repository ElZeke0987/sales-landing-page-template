"use client"
import { useState, useEffect } from "react";

export default function AddProduct(){
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [external_id, setExternal_id] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [category, setCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [images, setImages] = useState([]);

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
                imageUrl: images[0].url,
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
            <input type="file" multiple onChange={(e)=>{
                const files = e.target.files;
                const promises = [];
                for (let i = 0; i < files.length; i++) {
                    promises.push(new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            resolve({
                                name: files[i].name,
                                url: reader.result
                            });
                        };
                        reader.onerror = () => {
                            reject(new Error('Error reading file'));
                        };
                        reader.readAsDataURL(files[i]);
                    }));
                }
                Promise.all(promises).then((imgs) => {
                    setImages(imgs);
                }).catch((error) => {
                    console.error(error);
                });
            }}/>
            

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