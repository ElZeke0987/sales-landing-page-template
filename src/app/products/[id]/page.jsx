"use client";
import EProductPage from "@/e-commerce-app/src/comps/templates/e-product-page/eProductPage"
import { useProductIdStore } from "./productStore"
import { use, useEffect } from "react";
import ENav from "@/e-commerce-app/src/comps/e-nav/eNav";
import Header from "@/app/comps/sections/Header/Header";

export default function Products({ params }){
    const {setNewId}=useProductIdStore();
    const { id } = use(params);
    useEffect(()=>{
       setNewId(id)
    },[])
    return(
        <>
            <Header/>
            <EProductPage/>
        </>
    )
}