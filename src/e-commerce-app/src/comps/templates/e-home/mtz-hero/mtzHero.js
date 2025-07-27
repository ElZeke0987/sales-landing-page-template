"use client";

import Carousel from "@/app/comps/reusable/Carousel/Carousel";
import { exampleProducts } from "@/app/products/examplesProducts";
import HeroCarItem from "./heroCarItem";
import styles from "./mtzHero.module.scss";

export default function MtzHero(){
    return(
        <section className={"relative min-h-screen bg-gradient-to-b from-black to-gray-900 "+styles["mtz-hero"]}>
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center text-center mb-12">
                    <h1 className="text-6xl font-bold mb-4">
                        <span className="text-primary-500">MTZ</span>
                        <span className="text-white">Street</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl">
                        Nuestros productos mas populares
                    </p>
                </div>
                <article>
                    <Carousel 
                        objList={exampleProducts} 
                        entireVisualizer={true} 
                        Element={HeroCarItem}  
                        cooldownClickSeconds={610}
                    />
                </article>

                <div className={"mt-12 text-center flex justify-center"}>
                    <a className={styles["mtz-cta-button"]} href="/products">
                        Explorar catalogo
                    </a>
                </div>
            </div>

            {/* Nuevo: Elementos decorativos */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
        </section>
    )
}