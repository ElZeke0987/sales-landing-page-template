"use client";
import { useProductIdStore } from "./productStore"
import { use, useEffect } from "react";
import Header from "@/app/comps/sections/Header/Header";
import Product from "./e-product-page/Product/Product";

export default function Products({ params }){
    const {setNewId}=useProductIdStore();
    const { id } = use(params);
    useEffect(()=>{
       setNewId(id)
    },[])
    return(
        <>
            <Header/>
            <Product/>
        </>
    )
}