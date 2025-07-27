
import CTA from "../../reusable/cta/CTA"
//import "/../../../../../public/images/gorroLA.jpg";
import  Image  from "next/image";
import "./hero.scss";
import "../general.scss";
import { heroBG, heroImages, ImgHeroBG, infoHero } from "@/global-vars";

export default function HeroSection(){
    return(
        <section className="hero-section first-hero flex justify-start">
            <div className="max-w-7xl mx-auto px-4 flex flex-col h-full md:flex-row hero-cont items-center">
                <div className={"md:w-1/2 textual-hero"+(ImgHeroBG?"relative":"")}>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 hero-title">{infoHero[0].principalTitle}</h1>
                    <p className="text-lg mb-6  hero-sub">{infoHero[0].subTitle}</p>
                    <CTA className="hero-cont" text={infoHero[0].ctaText}/>
                    {ImgHeroBG&&<Image src={heroBG} width={250} height={250} alt="Imagen del Producto" className="w-full absolute top-0 left-0 bg-hero rounded-lg shadow-lg bg-gray-100"/>}
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0 hero-image h-full flex justify-center items-center">
                    <Image src={heroImages[0].imgUrl} width={1000} height={1000} alt="Imagen del Producto" className="hero-image-wh "/>
                </div>
            </div>
        </section>
    )
}