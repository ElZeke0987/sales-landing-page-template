"use client";
import { testimonialsList } from "@/global-vars"
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
                <Image src={obj.prfImg} height={100} width={100} alt="testimonial-img" />
                <h1 className="font-bold">{obj.nameTest}</h1>
            </div>
            <div className="">
                <p>
                    {obj.text}
                </p>
            </div>
        </div>
    )
}

export default function Testimonials(){

    return(
        <section className="testimonials-section vh-full-nav flex flex-col justify-center" id="testimonials" >
            <div className="w-full flex justify-center py-10  text-4xl font-bold">Testimonios</div>
            <Carousel objList={testimonialsList} Element={TestimonialItem}/>
        </section>
    )
}