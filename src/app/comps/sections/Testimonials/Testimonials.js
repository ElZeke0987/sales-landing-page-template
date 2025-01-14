"use client";
import { testimonialsList } from "@/global-vars"
import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./testimonials.scss";
import "../general.scss";
import Image from "next/image";


export default function Testimonials(){

    const [nextCarouselId, setNextCarouselId]=useState();
    const [carouselId, setCarouselId]=useState(1);
    const [prevCarouselId, setPrevCarouselId]=useState();
    const [isAnimating, setIsAnimating]=useState(0);

    useEffect(()=>{
        setNextCarouselId(carouselId+1);
        setPrevCarouselId(carouselId-1);

    },[carouselId])

    useEffect(()=>{
        //setTimeout(()=>{},3000)
        //setIsAnimating(0);
    },[isAnimating])

    function handleIndChange(dir){
        console.log("Changing carousel")
        setIsAnimating(dir=="next"?1:2);
        
        setCarouselId((prev)=>{
            if(prev==1&&dir=="prev")return testimonialsList.length-1
            else if(prev==testimonialsList.length-1&&dir=="next")return 1
            else return dir=="next"?prev+1:prev-1;

        })
    }

    return(
        <section className="testimonials-section vh-full flex flex-col justify-center" id="testimonials" >
            <div className="w-full flex justify-center py-10  text-4xl font-bold">Testimonios</div>
            <div className="carousel-container w-full flex justify-center">
                <button onClick={()=>handleIndChange("prev")} className="carousel-arrow w-10 ">{"<"}</button>
                <div className="carousel-list-cont flex justify-center">
                    <div className={"carousel-list flex flex-row px-4 "} style={{transform: `translateX(-${((carouselId-1) * 22)}vw)`}} onClick={()=>console.log("Click on testimonials section test")}>
                        {testimonialsList.map((tm, i)=>{
                            return(
                            <div key={i} className={"text-center carousel-item flex flex-col justify-evenly"}>
                                <div className="flex flex-col items-center justify-center w-full">
                                    <Image src={tm.prfImg} height={100} width={100} alt="testimonial-img" />
                                    <h1 className="font-bold">{tm.nameTest}</h1>
                                </div>
                                <div className="">
                                    <p>
                                        {tm.text}
                                    </p>
                                </div>
                                    
                                    
                            </div>)
                        
                        })}
                    </div>
                </div>
                <button onClick={()=>handleIndChange("next")} className="carousel-arrow w-10 ">{">"}</button>
            </div>
                
        </section>
    )
}