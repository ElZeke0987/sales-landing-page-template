"use client"
import { useState } from "react";
import UpdateItem from "./updateItem";
import { deleteProduct } from "./deleteProduct";

export default function ItemProduct({product}) {
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    if(isDeleted){
        return null;
    }
    return <li className="item-product"> 
        <UpdateItem product={product} setIsEditing={setIsEditing} isEditing={isEditing} setter={setIsDeleted}/>
        <button onClick={()=>setIsEditing(!isEditing)} className={`dev-panel-button ${isEditing?"dev-panel-button-active":""}`}>{isEditing?"X":"Update"}</button>
    </li>;
}