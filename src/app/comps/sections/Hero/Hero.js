import Image from "next/image"
import CTA from "../../reusable/cta/CTA"



export default function HeroSection(){
    return(
        <section className="pt-32 md:pt-0 ">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Descubre el Futuro de [Tu Producto]</h1>
                    <p className="text-lg text-gray-600 mb-6">Transforma tu vida con [Tu Producto]. Innovador, eficiente y diseñado para ti.</p>
                    <CTA/>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                    <img src="https://via.placeholder.com/400" alt="Imagen del Producto" className="w-full h-auto rounded-lg shadow-lg bg-gray-100"/>
                </div>
            </div>
        </section>
    )
}