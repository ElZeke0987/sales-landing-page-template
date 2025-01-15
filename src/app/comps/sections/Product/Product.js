"use client";
import { typesList } from "@/global-vars";
import Carousel from "../../reusable/Carousel/Carousel";
import Image from "next/image";
import "./product.scss";
import "../general.scss";
import { useState } from "react";

function ImageSelectFrame({obj, objOpt, setObjOpt}){

    return(
        <div className={""+(obj.id==objOpt.id?"type-selected":"")} onClick={()=>{setObjOpt(obj)}}>
            <div className="glass-abs">

            </div>
            <Image src={obj.imgUrl} width={100} height={100} alt={obj.title}/>
        </div>
    )
}

export default function Product(){

    const [objOpt, setObjOpt]=useState(typesList[0])

    return(
        <div className="py-10">
            <div>
                <div>
                    <div className="product-image-cont">
                        <Image src={objOpt.imgUrl} width={500} height={500} alt="Imagen del Producto" className="w-full h-full rounded-lg shadow-lg bg-gray-100"/>
                    </div>
                    
                    <div className="products-types-carousel">
                        <Carousel objList={typesList} Element={ImageSelectFrame} objOpt={objOpt} setObjOpt={setObjOpt} carouselListContClasses={"scroll-modern-mini-x"} selControls={true} centerAlwaysItems={false}/>
                    </div>
                </div>
                <div>
                    <h1>

                    </h1>
                </div>
                    
            </div>
            <div>

            </div>
        </div>
    )
}