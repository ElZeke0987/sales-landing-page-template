"use client";

import { outStandingProducts } from "@/global-vars";
import Image from "next/image";


export default function OutsProdsList(){
    function handleImageLoad(event) {
        console.log("Cargando");
        event.target.parentNode.classList.add('loaded');
    }

    return(
        <div className="outs-prods-list flex w-full justify-center"> 
            {outStandingProducts.map((obj, ind) => {
                return (
                    <div key={ind} className="out-prod-item bg-center bg-no-repeat bg-cover flex justify-center relative "  >
                        
                        <div className={"floating-image absolute bottom-0 left-0 overflow-hidden" + (ind % 2 === 0 ? ' floating-image-1' : ' floating-image-2')} >
                            
                                <Image src={obj.imgUrl} alt={obj.name} width={60000} height={60000} className="" onLoad={handleImageLoad} />
                            
                            
                        </div>
                        <div className="out-prod-name z-50">{obj.name}</div>
                    </div>
                )
            })
            }
            
        </div>
    )
}
