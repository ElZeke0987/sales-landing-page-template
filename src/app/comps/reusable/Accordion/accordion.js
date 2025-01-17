"use client";

import { useState, useRef, useEffect } from "react";
import "./accordion.scss";

export default function Accordion({list, propTitle="title", propTxt="content"}){
    
    const [selIndex, setSelIndex]=useState(-1)
    /*let dynamicMaxHeight;
    const content=useRef(null);
    useEffect(()=>{
        
    
        //if(!content.current)return
        const getContHeight=content.current?.scrollHeight;
        //Hay que tener en cuenta que esto obtiene de un solo lado (arriba) y por ende si se quiere aplicar padding, 
                                                                //los dos lados tienen que ser iguales, para que uno solo sea igual, en las variables, ponemos la mitad de lo que se quiere aplicar, 
                                                                //y centramos el elemento que quede pegado al lado contrario (con height del accordion-content-height content regulamos un espacio aparte de este lado contrario)
                                                                //Accordion-content-height sirve para regular la altura en medidas dinamicas % unicamente, ya que la medida dinamica padre, es a la vez absoluta (adaptada al contenido)
        console.log(`calc(${getContHeight*2}px `)
        dynamicMaxHeight={
            maxHeight:`${getContHeight*2}px`,

        }
    },[selIndex])*/
    return(
        <div className="rounded-xl accordion flex flex-col">
            {list.map((item, index)=>{
                
                
                const content=useRef(null);
                const getContHeight=content.current?.scrollHeight;
                /*const computedSstyles= window.getComputedStyle(content.current);
                const getContMaxHeight=computedSstyles.getPropertyValue("max-height");
                const getContTransDur=computedSstyles.getPropertyValue("transition-duration");
                const maths=(getContTransDur/getContMaxHeight)*getContHeight*getContMaxHeight;*/
                console.log(getContHeight*2)
                const dynamicMaxHeight={
                    maxHeight:`${getContHeight*2}px`,
                }
                return(
                <div className={`accordion-item flex flex-col `} key={index} >
                    <div className="accordion-title-cont flex justify-center w-full" onClick={()=>setSelIndex(prev=>{return(prev==index?-1:index)})}>
                        <div className="accordion-title flex justify-center" >
                            <h3>{item[propTitle]}</h3>
                        </div>
                        <div className="accordion-open-button">{selIndex===index?"-":"+"}</div>
                    </div>
                    <div className="accordion-content-cont flex justify-center items-center w-full">
                        <div className={`accordion-content flex flex-col ${selIndex===index?"open":""} items-center`} ref={content} style={selIndex===index?dynamicMaxHeight:undefined}>
                            <div className="accordion-content-height-top flex items-center"></div>
                            <p>{item[propTxt]}</p>
                            <div className="accordion-content-height-bottom flex items-center"></div>
                        </div>
                    </div>
                    
                </div>)
            })}
        </div>
    )
}