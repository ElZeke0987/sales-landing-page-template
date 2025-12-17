"use client";
import { addToCartSystem, typesList } from "@/global-vars";
import Carousel from "@/app/comps/reusable/Carousel/Carousel";
import Image from "next/image";
import "./product.scss";
import "../../general.scss";
import { useEffect, useState } from "react";
import { useProductIdStore } from "@/app/products/[id]/productStore";
import ProductVisuals from "./productVisuals/productVisuals";
import ProductAside from "./productAside/productAside";


export default function Product(){
    const {prodObj}=useProductIdStore()
    const [objOpt, setObjOpt]=useState(prodObj||{imgList: [{id: 0, imgUrl: "/public/images/testimonials/default-testimonial.jpg", title:"hola-dumy"}]})//Item a nivel objeto en programacion

    const [imgSel, setImgSel]=useState(objOpt.imgList[0]||{id: 0, imgUrl: "/public/images/testimonials/default-testimonial.jpg", title:"hola-dumy"})//Item a nivel imagen
    
    
    useEffect(()=>{
        if(prodObj){
            console.log("prodObj: ", prodObj)
            setObjOpt(prodObj)
            setImgSel(prodObj.thumbnail_url)
        }
    },[prodObj])

    if(!prodObj)return<div>Cargando producto...</div>


    return(
        <>
            <div className="w-full flex flex-col md:flex-row justify-center items-center product-section" id="product-section">
                <div className="flex product-principal flex-col lg:flex-row">
                    <ProductVisuals objOpt={objOpt} imgSel={imgSel} setImgSel={setImgSel}/>
                    <ProductAside objOpt={objOpt}/> 
                </div>
            </div>
        </>
    )
}