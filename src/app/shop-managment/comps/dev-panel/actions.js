
"use client"
import { useState, useEffect } from "react";
import ItemProduct from "./itemProduct/item-product";
import AddProduct from "./itemProduct/addProduct";
import { newProductList } from "@/globalMods/productBase";
import {fetchCategories} from "@/globalMods/categoryBase";
import AddCategory from "./filter-list/addCategory";
import ItemFilter from "./filter-list/ItemFilter";

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
    
    

    return <div className="dev-panel-actions md-w-none w-full">
        <div className="dev-panel-actions-buttons">
            <button onClick={()=>setMenu("products")} className="dev-panel-button">List Products</button>
            <button onClick={()=>setMenu("filters")} className="dev-panel-button">List Filters</button>
            <div className="dev-panel-add">
                {(menu==="products")&&<AddProduct categoryList={filters} setter={setProducts}/>}
                {(menu==="filters")&&<AddCategory setter={setFilters}/>}
            </div>
        </div>
        
        <ul className="dev-panel-products">
            {(products!==undefined&&products.length>0&&menu==="products")&&products.map((product)=>{
                return <ItemProduct key={product.id||product.external_id} product={product}/>
            })}
            {(filters!==undefined&&filters.length>0&&menu==="filters")&&filters.map((filter)=>{
                return <ItemFilter key={filter.id} filter={filter}/>
            })}
        </ul>
        
    </div>;
}