import { ImgTransNavBG } from "@/global-vars";
import Header from "./Header/Header";
import HeroSection from "./Hero/Hero";
import "./general.scss"
import Image from "next/image";


export default function Sections(){
    return(
        <>
            <div className={ImgTransNavBG?"relative first-sect-trans-nav":""}>
                
                <Header/>
                <HeroSection/>
                {ImgTransNavBG&&<Image src="/images/fondo-tranquilo.jpg" width={500} height={500} alt="Imagen del Producto" className="w-full h-full absolute top-0 left-0 bg-first-trans"/>}
            </div>
        </>
    )
}