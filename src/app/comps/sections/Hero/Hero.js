
import CTA from "../../reusable/cta/CTA"
//import "/../../../../../public/images/gorroLA.jpg";
import  Image  from "next/image";
import "./hero.scss";
import { ImgHeroBG } from "@/global-vars";

export default function HeroSection(){
    return(
        <section className="pt-32 md:pt-0 hero-section">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className={"md:w-1/2 "+(ImgHeroBG?"relative":"")}>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 hero-cont">Descubre el Futuro de [Tu Producto]</h1>
                    <p className="text-lg text-gray-600 mb-6  hero-cont">Transforma tu vida con [Tu Producto]. Innovador, eficiente y diseñado para ti.</p>
                    <CTA className="hero-cont"/>
                    {ImgHeroBG&&<Image src="/images/gorroLA.jpg" width={250} height={250} alt="Imagen del Producto" className="w-full h-auto absolute top-0 left-0 bg-hero rounded-lg shadow-lg bg-gray-100"/>}
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0 hero-image">
                    <Image src="/images/gorroLA.jpg" width={250} height={250} alt="Imagen del Producto" className="w-full h-auto rounded-lg shadow-lg bg-gray-100"/>
                </div>
            </div>
        </section>
    )
}