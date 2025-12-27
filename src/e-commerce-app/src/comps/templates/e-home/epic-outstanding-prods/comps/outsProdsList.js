"use client";

import { useState } from "react";
import { outStandingProducts } from "@/global-vars";
import Image from "next/image";


export default function OutsProdsList(){


    return(
        <div className="outs-prods-list flex w-full justify-center"> 
            {outStandingProducts.map((obj, ind) => {
                return (
                    <div key={ind} className="out-prod-item bg-center bg-no-repeat bg-cover flex justify-center relative "  >
                        
                        <div className="floating-image absolute bottom-0 left-0 overflow-hidden" >
                            
                                <Image src={obj.imgUrl} alt={obj.name} width={60000} height={60000} className="" />
                            
                            
                        </div>
                        <div className="out-prod-name z-50">{obj.name}</div>
                    </div>
                )
            })
            }
            
        </div>
    )
}
