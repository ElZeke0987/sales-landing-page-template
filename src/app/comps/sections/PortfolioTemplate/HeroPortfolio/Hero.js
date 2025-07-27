
import CTA from "../../../reusable/cta/CTA"
//import "/../../../../../public/images/gorroLA.jpg";
import  Image  from "next/image";
import "./hero.scss";
import "../general.scss";
import { heroBG, heroImages, ImgHeroBG, infoHero } from "@/global-vars";

export default function HeroSection(){
    return(
        <section className="hero-section first-hero flex justify-center items-center">
            <div className="flex flex-col h-full md:flex-row hero-cont items-center justify-center">
                <div className={"textual-hero flex flex-col items-center justify-center"+(ImgHeroBG?"relative":"")}>
                    <div className="w-full flex flex-col items-center justify-center">
                        <Image src="/images/me/me-10-10.jpg" width={1000} height={1000} className="hero-me"/>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 hero-title text-center">{infoHero[0].principalTitle}</h1>
                        <h2 className="text-lg mb-6 hero-sub">{infoHero[0].subTitle}</h2>
                    </div>
                    
                    <div className="hero-cta-section flex justify-center">
                        <CTA className="cta-contract" text={infoHero[0].ctaContract}/>
                        <CTA className="cta-projects" text={infoHero[0].ctaProjects}/>
                    </div>
                    
                    {ImgHeroBG&&<Image src={heroBG} width={250} height={250} alt="Imagen del Producto" className="w-full absolute top-0 left-0 bg-hero rounded-lg shadow-lg bg-gray-100"/>}
                </div>
                
            </div>
        </section>
    )
}