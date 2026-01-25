"use client";

import { outStandingProducts } from "@/global-vars";
import Image from "next/image";


export default function OutsProdsList(){
    function handleImageLoad(event) {
        console.log("Cargando");
        event.target.parentNode.classList.add('loaded');
    }

    function handleHoverBehindImgs(e){

    }

    return(
        <div className="outs-prods-list flex justify-center"> 
            {outStandingProducts.map((obj, ind) => {
                return (
                    <div key={ind} className="out-prod-item bg-center bg-no-repeat bg-cover flex justify-center relative "  >
                        <div className={"rotation-handler overflow-hidden rotation-handler-" + ind }>
                            <div className={"floating-image relative overflow-hidden floating-image-" + ind } >
                            
                                <Image src={obj.imgUrl} alt={obj.name} width={60000} height={60000} className="" onLoad={handleImageLoad} />
                            
                            </div>
                            <div className={"interactuable-part absolute bottom-0 left-0 flex justify-center items-end" } onMouseEnter={handleHoverBehindImgs}>
                                <div className="inside-content flex items-center justify-center h-full">
                                    <button className="bg-white text-black px-4 py-2 rounded  h-full">Ver más</button>
                                </div>
                            </div>
        
                        </div>
                        <div className={"static-bg-fimage absolute bottom-0 left-0 overflow-hidden"}>
                            
                        </div>
                        
                        <div className="out-prod-name z-50 absolute bottom-0 left-0 w-full h-full flex justify-center items-center">{obj.name}</div>
                    </div>
                )
            })
            }
            
        </div>
    )
}
