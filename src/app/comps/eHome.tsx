"use client"
import MtzHero from "./mtz-hero/mtzHero";
import OutsProds from "./epic-outstanding-prods/outsProds"
import LazyFrame from "./reusable/LazyLoad/LazyFrame"
import Categories from "./categories/categories"
import StorySlider  from "./story-slider/storySlider"
import { useEffect, useRef } from "react"


export default function EHome(){
  
    return(
        <div className="flex flex-col w-screen">
            
                {<LazyFrame fullViewport threshold={0.2}><MtzHero/></LazyFrame>}
            
                { <LazyFrame fullViewport threshold={0.2}><Categories/></LazyFrame> }
            
                { process.env.NODE_ENV === "development" && <LazyFrame fullViewport threshold={0.2}><OutsProds/></LazyFrame> }

                { process.env.NODE_ENV === "development" && <LazyFrame fullViewport threshold={0.2} ><StorySlider/></LazyFrame>}
        </div>
    ) 
}