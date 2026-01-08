"use client";

import { useState } from "react";
import Carousel from "@/app/comps/reusable/Carousel/Carousel";
import { exampleProducts } from "@/app/products/examplesProducts";
import HeroCarItem from "./heroCarItem";
import "./mtzHero.scss";
import Image from "next/image";

export default function MtzHero() {
    const [ctaHovered, setCtaHovered] = useState(false);

    return (
        <section className="relative min-h-screen bg-gradient-to-b from-black to-gray-900 mtz-hero overflow-hidden w-full h-full">
            <div className="container mx-auto px-4 py-16 z-50  inset-0">
                <div className=" flex flex-col items-center text-center mb-12 z-50 ">
                    <h1 className="text-6xl font-bold mb-4 z-50 ">
                        <span className="text-primary-500 z-50">2110's </span>
                        <span className="text-white z-50">Store</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl z-50">
                        Traemos mas estilo del que estabas buscando
                    </p>
                </div>
                <div className={"mt-12 text-center flex justify-center"}>
                    <a
                        className="mtz-cta-button"
                        href="/products"
                        onMouseEnter={() => setCtaHovered(true)}
                        onMouseLeave={() => setCtaHovered(false)}
                    >
                        Explorar catalogo
                    </a>
                </div>
            </div>

            {/* Nuevo: Elementos decorativos */}
            <Image
                className={`absolute inset-0 bottom-0 left-0 w-full h-full z-0 transition-all-custom ${
                    ctaHovered ? "bg-image-onh" : ""
                }`}
                src="/images/heroImages/cadenitas-muestra.jpg"
                alt="imagen-de-fond"
                width={100000}
                height={100000}
            />
            <div
                className={`absolute bottom-0 left-0 w-full h-32 rotate-effect-and-center 
                    size-hero-red-element bg-red-800/50 
                    ${ ctaHovered ? "red-item-on-hover" : ""}`}
            ></div>
        </section>
    );
}