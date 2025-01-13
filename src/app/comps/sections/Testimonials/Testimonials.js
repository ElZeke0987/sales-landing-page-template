"use client";
import { testimonialsList } from "@/global-vars"
import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./testimonials.scss";


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
            if(prev==1&&dir=="prev")return testimonialsList.length
            else if(prev==testimonialsList.length-1&&dir=="next")return 1
            else return dir=="next"?prev+1:prev-1;

        })
    }

    return(
        <section className="testimonials-section h-10" id="testimonials" >
            <div className="carousel-container w-full flex justify-center">
                <button onClick={()=>handleIndChange("prev")} className="carousel-arrow w-10 ">{"<"}</button>
                <div className="carousel-list-cont flex justify-center">
                    <div className={" carousel-list flex flex-row px-4 "} style={{transform: `translateX(-${((carouselId-1) * 22)}vw)`}} onClick={()=>console.log("Click on testimonials section test")}>
                        {testimonialsList.map((tm, i)=>{
                            return(<div key={i} className={"text-center carousel-item "}>{tm.text}</div>)
                        
                        })}
                    </div>
                </div>
                <button onClick={()=>handleIndChange("next")} className="carousel-arrow w-10 ">{">"}</button>
            </div>
                
        </section>
    )
}