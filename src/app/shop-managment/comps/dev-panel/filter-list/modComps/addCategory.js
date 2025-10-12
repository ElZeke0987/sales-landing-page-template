"use client"
import { useState } from "react";
export default function AddFilter() {
    const [name, setName] = useState('');
        const [isAdding, setIsAdding] = useState(false);
        function handleNameChange(event) {
            setName(event.target.value);
        }
        async function addFilter(){
            const response = await fetch('/api/add-category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                }),
            }); 
            const data = await response.json();
            setIsAdding(false);
        }
        
        return <div className="dev-panel-add-product">
            
            {isAdding&&<>
                <input type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
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