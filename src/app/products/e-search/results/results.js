"use client";

import useFilterStore from "@/stores/filterStore"
import ProductCard from "./productCard/productCard"
import "./results.scss";
import { useEffect, useState } from "react";
import { newProductList } from "@/globalMods/productBase";

import { useProductListStore } from "../../[id]/productStore";

export default function Results(){
    const { filters } = useFilterStore();
    const [productList, setProductList]= useState([])
    const productStore = useProductListStore()

    useEffect(()=>{
        async function fetchProducts(){
            const settedNewProducts = await productStore.setProducts()
            setProductList(productStore.products)
            newProductList(setProductList)
        }
        fetchProducts()
        
    }, [])
    const filteredProducts = productList?.filter((prd) => {
        const categories = filters?.category;

        // si no hay filtros activos → mostrar todo
        if (!categories || categories.every(cat => !cat.act)) {
            return true;
        }

        // si hay alguno activo → match por categoría
        return categories.some(
            cat => cat.id === prd.category_id && cat.act === true
        );
    });
    return(
        <div className="flex flex-row items-center justify-center results-gap flex-wrap">
            {
                
                filteredProducts?.map((prd) => (
                    <ProductCard
                        key={prd.id}    
                        productObj={prd}
                    />
                ))
            }
        </div>
    )
}