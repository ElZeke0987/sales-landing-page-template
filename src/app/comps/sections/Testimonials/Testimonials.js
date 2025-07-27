"use client";
import { testimonialsList, titlesObj } from "@/global-vars"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./testimonials.scss";
import "../general.scss";
import Image from "next/image";
import Carousel from "../../reusable/Carousel/Carousel";

function TestimonialItem({obj, i}){
    return(
        <div key={i} className={"text-center carousel-item flex flex-col justify-evenly w-full"}>
            <div className="flex flex-col items-center justify-center w-full">
                <div className="testimonial-image">
                    <Image src={obj.prfImg} height={100} width={100} alt="testimonial-img"/>
                </div>
                
                <h1 className="font-bold testimonial-name">{obj.nameTest}</h1>
            </div>
            <div className="">
                <p className="testimonial-p">
                    {obj.text}
                </p>
            </div>
        </div>
    )
}

export default function Testimonials(){

    return(
        <section className="testimonials-section flex flex-col justify-center" id="testimonials" >
            <div className="w-full flex justify-center text-4xl font-bold testimonials-section-title">{titlesObj.testimonials}</div>
            
                <Carousel objList={testimonialsList} Element={TestimonialItem} centerAlwaysItems={false}/>
            
                
        </section>
    )
}