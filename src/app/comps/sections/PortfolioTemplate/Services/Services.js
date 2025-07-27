import Image from "next/image";
import "./services.scss";
import {servicesList} from "./servicesVars.js";
import CTA from "@/comps/reusable/cta/CTA";


export default function Services(){
    return(
        <section className="services-section overflow-hidden flex flex-col">
            <div className="flex w-full justify-center items-center">
                <h2>Services</h2>
            </div>
            <div className="w-full flex justify-center srv-grid-cont">
                <div className="flex srv-grid justify-center">
                    {servicesList.map((srv, i)=>{
                        return(<div className="service-card overflow-hidden flex flex-col" key={i}>
                            <Image src={srv.imgUrl==""?"/public/images/dummy/dummy-image.png":srv.imgUrl} className="princ-img w-full" width={1000} height={1000} alt={srv.alt||"imagen servicio"}/>
                            <div className="w-full flex justify-center"><div className="anim-line relative overflow-hidden"></div></div>
                            <div className="srv-textual">
                                <h3>{srv.title}</h3>
                                <p>{srv.content}</p>
                                
                            </div>
                            <div className="cta-cont flex items-center justify-center"><CTA text={srv.cta}/></div>
                        </div>)
                    })}
                </div>
            </div>
        </section>

    )
}