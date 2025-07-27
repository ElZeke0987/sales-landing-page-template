"use client";

import useFilterStore from "../filter/base/filterStore"
import ProductCard from "./productCard/productCard"
import "./results.scss";


export default function Results(){
    const {filters, productList}=useFilterStore()
    return(
        <div className="flex flex-col items-center justify-center results-gap">
            {
                
                productList.map((prd,i)=>{
                    if(filters.category?.every((cat)=>!cat.act))return(
                        <div key={i}>
                            <ProductCard productObj={prd} />
                        </div>
                    )
                    if(filters.category.some(cat=>cat.val==prd.val&&cat.act==true))return ( 
                    <div key={i}>
                        <ProductCard productObj={prd} />
                    </div>
                    )
                })
            }
        </div>
    )
}