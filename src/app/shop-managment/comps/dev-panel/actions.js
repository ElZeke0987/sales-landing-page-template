
"use client"
import { useState } from "react";
import ItemProduct from "./itemProduct/item-product";

export default function Actions() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    async function listProducts() {
        const response = await fetch('/api/get-products');
        const data = await response.json();
        setProducts(data);
    }
    async function listFilters() {
        const response = await fetch('/api/filters');
        const data = await response.json();
        setFilters(data);
    }

    return <div>
        <button onClick={listProducts}>List Products</button>
        <button onClick={listFilters}>List Filters</button>
        <ul className="dev-panel-products">
            {products!==undefined&&products.map((product)=>{
                return <ItemProduct key={product.id} product={product}/>
            })}
        </ul>
    </div>;
}