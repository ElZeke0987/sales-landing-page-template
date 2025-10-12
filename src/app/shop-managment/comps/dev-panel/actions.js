
"use client"
import { useState, useEffect } from "react";
import ItemProduct from "./itemProduct/item-product";
import AddProduct from "./itemProduct/addProduct";
import FilterList from "./filter-list/FilterList";

export default function Actions() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);

    const [menu, setMenu] = useState("products");
    async function listProducts() {
        const response = await fetch('/api/get-products');
        const data = await response.json();
        console.log(data.length);
        setProducts(data);
    }
    async function listFilters() {
        const response = await fetch('/api/get-filters');
        const data = await response.json();
        setFilters(data);
    }
    useEffect(()=>{
        listProducts();
        listFilters();
    }, []);
    
    

    return <div className="dev-panel-actions">
        <div className="dev-panel-actions-buttons">
            <button onClick={()=>setMenu("products")} className="dev-panel-button">List Products</button>
            <button onClick={()=>setMenu("filters")} className="dev-panel-button">List Filters</button>
            <div className="dev-panel-add">
                {(menu==="products")&&<AddProduct/>}
                {(menu==="filters")&&<FilterList filters={filters}/>}
            </div>
        </div>
        
        <ul className="dev-panel-products">
            {(products!==undefined&&products.length>0&&menu==="products")&&products.map((product)=>{
                return <ItemProduct key={product.id||product.external_id} product={product}/>
            })}
        </ul>
        
    </div>;
}