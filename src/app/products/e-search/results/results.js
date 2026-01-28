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
    }, [])
    return(
        <div className="flex flex-col items-center justify-center results-gap">
            {
                
                productList?.map((prd,i)=>{
                    console.log("testing prd in results comp iteration/map: ", prd)
                    if(filters?.category?.every((cat)=>!cat.act))return(
                        <div key={i}>
                            <ProductCard productObj={prd} />
                        </div>
                    )
                    if(filters?.category?.some(cat=>cat.id==prd.category_id&&cat.act==true))return ( 
                    <div key={i}>
                        <ProductCard productObj={prd} />
                    </div>
                    )
                })
            }
        </div>
    )
}