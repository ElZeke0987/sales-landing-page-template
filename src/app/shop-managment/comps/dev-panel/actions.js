
"use client"
import { useState, useEffect } from "react";
import ItemProduct from "./itemProduct/item-product";
import AddProduct from "./itemProduct/addProduct";
import FilterList from "./filter-list/FilterList";
import { newProductList } from "@/globalMods/productBase";
import {fetchCategories} from "@/globalMods/categoryBase";


export default function Actions() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);

    const [menu, setMenu] = useState("products");
    async function listProducts() {
        const data = await newProductList();
        console.log(data.length);
        setProducts(data);
    }
    async function listFilters() {
        const data = await fetchCategories(setFilters);
        console.log("categoryList", data)
        setFilters(data)
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
                {(menu==="products")&&<AddProduct categoryList={filters}/>}
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