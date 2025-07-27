import "./cta.scss";

export default function CTA({text= "¡Comienza Ahora!", href="#product-section", ctaStyles}: CTAProps){
    return (
        <div className="flex justify-center ">
            <a href={href} className=" text-white px-6 py-3 rounded-lg shadow  hover:bg-blue-600 transition duration-300 cta-button flex justify-center items-center">
                <span className="cta-text">{text}</span>
                <span className="anim-block-cta"></span>
            </a>
            
        </div>
        

    )
}