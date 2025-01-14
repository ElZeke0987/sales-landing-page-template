import { ImgTransNavBG } from "@/global-vars";
import Header from "./Header/Header";
import HeroSection from "./Hero/Hero";
import "./general.scss"
import Image from "next/image";
import Benefits from "./Benefits/Benefits";
import Testimonials from "./Testimonials/Testimonials";


export default function Sections(){
    return(
        <div>
            <div className={(ImgTransNavBG?"relative first-sect-trans-nav":"")}>
                {/* Poner aca adentro las secciones que tendran el mismo fondo */}
                <Header/>
                <HeroSection/>
                {ImgTransNavBG&&<Image src="/images/fondo-tranquilo.jpg" width={500} height={500} alt="Fondo de Hero y Nav" className="w-full h-full absolute top-0 left-0 bg-first-trans"/>}
            </div>
            <Benefits/>
            <Testimonials/>
        </div>
    )
}