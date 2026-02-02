"use client"
import { useState } from "react";
export default function AddCategory() {
    const [title, setTitle] = useState('');
    const [val, setVal] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    function handleTitleChange(event) {
        setTitle(event.target.value);
    }
    function handleValChange(event) {
        setVal(event.target.value);
    }
    async function addFilter(e){
        console.log("ADDING THIS: ", {
                name: title,
                name_id: val,
            })
        const response = await fetch('/api/add-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: title,
                name_id: val,
            }),
        }); 
        const data = await response.json();
        setIsAdding(false);
    }
    
    return <div className="dev-panel-add-product">
        
        {isAdding&&<div className="dev-on-adding fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
            <input type="text" placeholder="Title text" value={title} onChange={handleTitleChange}/>
            <input type="text" placeholder="Value for category (No spaces)" value={val} onChange={handleValChange}/>
            <div className="dev-panel-add-product-buttons">
                <button className="dev-panel-button cancel-button" onClick={()=>setIsAdding(!isAdding)}>Cancel</button>
                <button className="dev-panel-button" onClick={addFilter}>Add</button>
            </div>
        </div>}
        <div className="dev-panel-add-product-buttons">
            <button className="dev-panel-button" onClick={()=>setIsAdding(!isAdding)}>Add Filter</button>
        </div>
    </div>;
}