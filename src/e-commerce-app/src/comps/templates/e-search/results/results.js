"use client";

import useFilterStore from "../filter/base/filterStore"
import ProductCard from "./productCard/productCard"
import "./results.scss";
import { useEffect, useState } from "react";
import { newProductList } from "../filter/base/productsBase";

export default function Results(){
    const { filters } = useFilterStore();
    const [productList, setProductList]= useState([])
    useEffect(()=>{
        newProductList(setProductList)
    }, [filters])
    return(
        <div className="flex flex-col items-center justify-center results-gap">
            {
                
                productList?.map((prd,i)=>{
                    console.log("testing prd: ", prd)
                    if(filters?.category?.every((cat)=>!cat.act))return(
                        <div key={i}>
                            <ProductCard productObj={prd} />
                        </div>
                    )
                    if(filters?.category?.some(cat=>cat.val==prd.val&&cat.act==true))return ( 
                    <div key={i}>
                        <ProductCard productObj={prd} />
                    </div>
                    )
                })
            }
        </div>
    )
}