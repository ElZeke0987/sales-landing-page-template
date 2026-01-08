"use client"
import MtzHero from "./mtz-hero/mtzHero";
import OutsProds from "./epic-outstanding-prods/outsProds"
import LazyFrame from "./reusable/LazyLoad/LazyFrame"
import Categories from "./categories/categories"

export default function EHome(){
    return(
        <div className="flex flex-col">
            
                <LazyFrame fullViewport threshold={0.2}><MtzHero/></LazyFrame>
            
            
                <LazyFrame fullViewport threshold={0.2}><OutsProds/></LazyFrame>

                <LazyFrame fullViewport threshold={0.2}><Categories/></LazyFrame>
            
        </div>
    ) 
}