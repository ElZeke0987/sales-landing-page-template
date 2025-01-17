"use client";
import { typesList } from "@/global-vars";
import Carousel from "../../reusable/Carousel/Carousel";
import Image from "next/image";
import "./product.scss";
import "../general.scss";
import { useState } from "react";
import CustomSelect from "../../reusable/customSelect/customSelect";

function ImageSelectFrame({obj, objOpt, setObjOpt}){

    return(
        <div className={"type-item "+(obj.id==objOpt.id?"type-selected":"")} onClick={()=>{setObjOpt(obj)}}>
            <div className="glass-abs">

            </div>
            <Image src={obj.imgUrl} width={100} height={100} alt={obj.title}/>
        </div>
    )
}


export default function Product(){

    const [objOpt, setObjOpt]=useState(typesList[0])
    const [quantitySel, setQuatitySel]=useState(1);

    function changeStockQuantity(e){
        setQuatitySel(e.target.value)
    }
    const stockNumbers=Array.from({length: objOpt.stock<objOpt.buyLimit?objOpt.stock:objOpt.buyLimit}, (_,i)=>{return {val:i+1, txt: `${i+1} unidades`}});
    return(
        <div className="w-full flex flex-col md:flex-row justify-center items-center product-section" id="product-section">
            <div className="flex product-principal flex-col lg:flex-row">
                <div className="flex flex-col product-visuals">
                    <div className="product-image-cont flex justify-center items-center">
                        <Image src={objOpt.imgUrl} width={500} height={500} alt="Imagen del Producto" className="rounded-lg shadow-lg bg-gray-100"/>
                    </div>
                    
                    <div className="products-types-carousel">
                        <Carousel objList={typesList} Element={ImageSelectFrame} objOpt={objOpt} setObjOpt={setObjOpt} carouselListContClasses={"scroll-modern-mini-x no-hover-scroll"} selControls={true} centerAlwaysItems={false}/>
                    </div>
                </div>
                <div className="flex flex-col justify-around product-info-sub">
                    <div className="product-info">
                        <h1 className="product-title w-full">
                            {objOpt.title}
                        </h1>
                        <h2 className="product-price">
                            ${objOpt.price}
                        </h2>
                        <div className="product-desc">
                            {objOpt.desc}
                        </div>
                    </div>
                    <div className="product-buy-cont flex flex-col">
                        <CustomSelect opts={stockNumbers} defaultText="1 unidad" defaultValue={1} clases="stock-select"/>
                        
                        <div className="flex flex-col items-center product-buy-buttons">
                            <button className="buy-now button-buy">Buy Now</button>
                            <button className="add-to-cart  button-buy">Add to cart</button>
                        </div>
                        
                    </div>
                </div>
                    
                    
            </div>
            <div>

            </div>
        </div>
    )
}