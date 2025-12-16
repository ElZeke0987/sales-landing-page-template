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
    async function addFilter(){
        const response = await fetch('/api/add-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                val,
            }),
        }); 
        const data = await response.json();
        setIsAdding(false);
    }
    
    return <div className="dev-panel-add-product">
        
        {isAdding&&<>
            <input type="text" placeholder="Title text" value={title} onChange={handleTitleChange}/>
            <input type="text" placeholder="Value for category (No spaces)" value={val} onChange={handleValChange}/>
        </>}
        <div className="dev-panel-add-product-buttons">
            {isAdding?
            <>
            <button className="dev-panel-button cancel-button" onClick={()=>setIsAdding(!isAdding)}>Cancel</button>
            <button className="dev-panel-button" onClick={addFilter}>Add</button>
            
            </>:
            <button className="dev-panel-button" onClick={()=>setIsAdding(!isAdding)}>Add Filter</button>
            }
        </div>
    </div>;
}