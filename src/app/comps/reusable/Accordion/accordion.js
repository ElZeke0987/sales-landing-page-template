"use client";

import { useState, useRef, useEffect } from "react";
import "./accordion.scss";

export default function Accordion({list, propTitle="title", propTxt="content"}){
    
    const [selIndex, setSelIndex]=useState(-1)
    
    return(
        <div className="rounded-xl accordion flex flex-col">
            {list.map((item, index)=>{
                const content=useRef(null);
                const getContHeight=content.current?.scrollHeight;
                /*const computedSstyles= window.getComputedStyle(content.current);
                const getContMaxHeight=computedSstyles.getPropertyValue("max-height");
                const getContTransDur=computedSstyles.getPropertyValue("transition-duration");
                const maths=(getContTransDur/getContMaxHeight)*getContHeight*getContMaxHeight;*/
                console.log(getContHeight)
                const dynamicMaxHeight={
                    maxHeight:`${getContHeight}px`,
                }

                return(
                <div className={`accordion-item flex flex-col `} key={index} >
                    <div className="accordion-title-cont flex justify-center w-full" onClick={()=>setSelIndex(prev=>{return(prev==index?-1:index)})}>
                        <div className="accordion-title flex justify-center" >
                            <h3>{item[propTitle]}</h3>
                        </div>
                        <div className="accordion-open-button">{selIndex===index?"-":"+"}</div>
                    </div>
                    <div className="accordion-content-cont flex justify-center w-full">
                        <div className={`accordion-content flex ${selIndex===index?"open":""}`} ref={content} style={selIndex===index?dynamicMaxHeight:undefined}>
                            <p>{item[propTxt]}</p>
                        </div>
                    </div>
                    
                </div>)
            })}
        </div>
    )
}