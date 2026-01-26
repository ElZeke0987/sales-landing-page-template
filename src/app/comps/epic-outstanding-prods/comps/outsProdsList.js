"use client";

import { outStandingProducts } from "@/global-vars";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


export default function OutsProdsList(){

    const prodItemRef = useRef(null);
    const listProdsRef = useRef(null);
    const [listWidth, setListWidth] = useState(0);
    const [listGap, setListGap] = useState(0);

    
    useEffect(() => {
        if(prodItemRef.current){
            const rect = prodItemRef.current.getBoundingClientRect();
            setListWidth(rect.width * outStandingProducts.length);
        }
    }, [prodItemRef]);


    useEffect(() => {
        if(listProdsRef.current){
            const styles = getComputedStyle(listProdsRef.current);
            setListGap(parseFloat(styles.gap)*(outStandingProducts.length-1));
        }
    }, [listProdsRef]);


    useEffect(() => {
        console.log("listWidth: " + listWidth + " listGap: " + listGap + " window.innerWidth: " + window.innerWidth);
    }, [listWidth, listGap]);
    
    function handleImageLoad(event) {
        console.log("Cargando");
        event.target.parentNode.classList.add('loaded');
    }

    function handleHoverBehindImgs(e){

    }

    return(
        <div className={`outs-prods-list flex ${listWidth+listGap >= window.innerWidth ? "justify-start" : "justify-center"}`} ref={listProdsRef}> 
            {outStandingProducts.map((obj, ind) => {
                return (
                    <div key={ind} className="out-prod-item bg-center bg-no-repeat bg-cover flex justify-center relative " ref={prodItemRef} >
                        <div className={"rotation-handler overflow-hidden rotation-handler-" + ind }>
                            <div className={"floating-image relative overflow-hidden floating-image-" + ind } >
                            
                                <Image src={obj.imgUrl} alt={obj.name} width={60000} height={60000} className="" onLoad={handleImageLoad} />
                            
                            </div>
                            <div className={"interactuable-part absolute bottom-0 left-0 flex justify-center items-end" } onMouseEnter={handleHoverBehindImgs}>
                                <div className="inside-content flex items-center justify-center h-full">
                                    <button className="bg-white text-black px-4 py-2 rounded  h-full w-full">Ver más</button>
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
