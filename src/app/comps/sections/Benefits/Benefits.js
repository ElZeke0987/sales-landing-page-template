"use client";
import { benefitsList } from "@/global-vars";
import "./benefits.scss";
import "../general.scss";
import { useState } from "react";
import Image from "next/image";



function BenefitItem({benefitObj, openId, setOpenId, actualId}){
    return(
        <div className="bg-gray-600 rounded-md benefit-item md:w-64 py-4" key={actualId}>
            <div className="flex justify-center"><Image src={benefitObj.imgUrl} className="rounded-full w-auto" width={500} height={500} alt={benefitObj.title} /></div>
            <h1 className="text-center font-extrabold my-10">{benefitObj.title}</h1>
            <div className="flex justify-center w-full benefit-desc"><p className="text-center">{benefitObj.description}</p></div>
        </div>
    )
}

export default function Benefits(){
    const [openId, setOpenId]=useState();

    return(
        <section className="flex flex-col justify-center items-center w-full benefits-section vh-full" id="benefits">
            <h1 className="text-lg md:text-3xl font-extrabold p-8 text-center"> Beneficios de nuestro gorro </h1>
            <div className="grid md:grid-cols-3 gap-8">
                {
                    benefitsList.map((obj, i)=>{
                        
                        return <BenefitItem benefitObj={obj} openId={openId} setOpenId={setOpenId} actualId={i} key={i} />
                    })
                }
            </div>
        </section>
    )
}