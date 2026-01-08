"use client";
import { addToCartSystem, typesList } from "@/global-vars";
import Carousel from "@/app/comps/reusable/Carousel/Carousel";
import Image from "next/image";
import "./product.scss";
import "../general.scss";
import { useEffect, useState } from "react";
import { useProductIdStore } from "@/app/products/[id]/productStore";
import ProductVisuals from "./productVisuals/productVisuals";
import ProductAside from "./productAside/productAside";
const defaultImages = {imgList: [{id: 0, imgUrl: "/public/images/testimonials/default-testimonial.jpg", title:"hola-dumy"}]};
const defaultImg = {id: 0, title:"hola-dumy"};
export default function Product(){

    const {prodObj, setNewId}=useProductIdStore()
    const [objOpt, setObjOpt]=useState()//Item a nivel objeto en programacion
    const [imgSel, setImgSel]=useState(defaultImg)//Item a nivel imagen
    const urlPaths = window.location.pathname.split("/")[2]
    useEffect(()=>{
        setNewId(urlPaths)
    },[])
    
    useEffect(()=>{
        if(prodObj){
            let imageListToShow = [];
            [{name: "catalog-logo",url: prodObj?.thumbnail_url},...prodObj?.extraImages].forEach((item, ind)=>{
                const newItem = {
                    id: ind,
                    ...item
                }
                imageListToShow.push(newItem)
            })

            setImgSel(defaultImages)
        }
    },[prodObj])
    if(!prodObj){
        return<div>Cargando producto...</div>
    }

    return(
        <>
            <div className="w-full flex flex-col md:flex-row justify-center items-center product-section" id="product-section">
                <div className="flex product-principal flex-col lg:flex-row">
                    <ProductVisuals objOpt={prodObj} imgSel={imgSel} setImgSel={setImgSel}/>
                    <ProductAside objOpt={prodObj}/> 
                </div>
            </div>
        </>
    )
}