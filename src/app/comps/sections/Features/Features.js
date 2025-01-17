"use client";
import { featuresList } from "@/global-vars";
import "./features.scss";
import "../general.scss";
import { useState } from "react";
import Image from "next/image";

import CTA from "../../reusable/cta/CTA";

function FeatureItem({featureObj, openId, setOpenId, actualId}){
    return(
        <div className="rounded-md feature-item md:w-64 flex flex-col" key={actualId}>
            <div className="flex justify-center feature-img">
                <Image src={featureObj.imgUrl} className="rounded-full w-auto" width={500} height={500} alt={featureObj.title} />
            </div>
            <h1 className="text-center font-extrabold item-feature-title">{featureObj.title}</h1>
            <div className="flex justify-center w-full item-feature-desc"><p className="text-center">{featureObj.description}</p></div>
        </div>
    )
}

export default function features(){
    const [openId, setOpenId]=useState();

    return(
        <section className=" w-full flex flex-col features-section py-16 justify-center" id="features">
            <h1 className="text-lg md:text-3xl font-extrabold text-center features-title"> Beneficios de nuestro gorro </h1>
            <div className="features-cont flex flex-col">
                <div className="md:grid-cols-3 features-list">
                    {
                        featuresList.map((obj, i)=>{
                            
                            return <FeatureItem featureObj={obj} openId={openId} setOpenId={setOpenId} actualId={i} key={i} />
                        })
                    }
                </div>
                <CTA text="Comprueba estos beneficios"/>
            </div>
                
        </section>
    )
}