"use client";

import { useEffect, useRef, useState } from "react";
import useFilterStore from "../base/filterStore"
import { filterLists } from "../base/filterVars";
import "./styles/filterMenu.scss";
import { useOpenFilter } from "./buttonFilter";


export default function FilterMenu(){
    const content=useRef(null);
    const contentToUseStyle=useRef(null)
    const minimalItem=useRef(null)

    const minimalQ=filterLists.category.length

    let dynamicMaxHeight;
    const [maxHeight, setMaxHeight]=useState('auto');
    const {innerOpenState} = useOpenFilter();
    useEffect(()=>{
        if(!contentToUseStyle.current||!minimalItem?.current)return;
        const stylesCont= window.getComputedStyle(contentToUseStyle.current);
        const minimalStylesCont = window.getComputedStyle(minimalItem?.current);

        const paddingStyles=parseFloat(stylesCont.paddingTop)+parseFloat(stylesCont.paddingBottom);
        const marginStyles=parseFloat(stylesCont.marginTop)+parseFloat(stylesCont.marginBottom);

        const minimalPaddingStyles=parseFloat(minimalStylesCont.paddingTop)+parseFloat(minimalStylesCont.paddingBottom);
        const minimalMarginStyles=parseFloat(minimalStylesCont.marginTop)+parseFloat(minimalStylesCont.marginBottom);


        const minimalHeights=(minimalItem?.current?.scrollHeight+minimalMarginStyles+minimalPaddingStyles)*minimalQ;

        const getContHeight=content.current?.scrollHeight;
        console.log("styles to add: ", minimalHeights)
        console.log("cont height: ",getContHeight);
        setMaxHeight(`${getContHeight}px`);
    },[])
    
    const {filters, addCategory}=useFilterStore();
    return(
        <div className={`visualizer-field overflow-hidden ${!innerOpenState&&"close-anim"} flex justify-center`} ref={content} style={{maxHeight, height: maxHeight}}>
            <aside className="filter-menu flex justify-center" ref={contentToUseStyle}>
                <div className="multi-select flex flex-col justify-center">
                    {
                        
                        filters.category?.map((objCat, i)=>{
                            return(
                                <div onClick={e=>addCategory(objCat)}  key={i} className="multi-select-item flex items-center" ref={minimalItem}>
                                    
                                    <span className={`outline-input ${objCat.act&&"activated-inp"}`} key={i}></span>
                                    <span>{objCat.txt||objCat.title}</span>
                                </div>
                            )
                        })
                        
                    }
                </div>
                
            </aside>
        </div>
        
    )
}