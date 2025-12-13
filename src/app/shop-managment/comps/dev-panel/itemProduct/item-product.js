"use client"
import { useState } from "react";
import UpdateItem from "./updateItem";
import { deleteProduct } from "./deleteProduct";

export default function ItemProduct({product}) {

    const [isEditing, setIsEditing] = useState(false);
    return <li className="item-product"> 
        <UpdateItem product={product} setIsEditing={setIsEditing} isEditing={isEditing}/>
        <div>
            <button onClick={()=>setIsEditing(!isEditing)} className={"dev-panel-button "+isEditing?"dev-panel-button-active":""}>{isEditing?"Cancel":"Update"}</button>
            <button onClick={()=>deleteProduct(product.id)}>Delete</button>
        </div>
    </li>;
}