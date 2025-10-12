
"use client"
import { useState } from "react";
import ItemProduct from "./itemProduct/item-product";
import AddProduct from "./itemProduct/addProduct";
import FilterList from "./filter-list/FilterList";

export default function Actions() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
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

    return <div className="dev-panel-actions">
        <div className="dev-panel-actions-buttons">
            <button onClick={listProducts} className="dev-panel-button">List Products</button>
            <button onClick={listFilters} className="dev-panel-button">List Filters</button>
            <div className="dev-panel-add">
                {(products.length>0)&&<AddProduct/>}
            </div>
        </div>
        
        <ul className="dev-panel-products">
            {(products!==undefined&&products.length>0)&&products.map((product)=>{
                return <ItemProduct key={product.id||product.external_id} product={product}/>
            })}
        </ul>
        <FilterList filters={filters}/>
    </div>;
}