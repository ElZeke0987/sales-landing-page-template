import MtzHero from "./mtz-hero/mtzHero";
import Features from "@/app/comps/sections/Features/Features";
import { featuresList, ctaConfig } from "@/globalVars/features";
import { titlesObj } from "@/global-vars";
import OutsProds from "./epic-outstanding-prods/outsProds"
import LazyFrame from "../../../../../app/comps/reusable/LazyLoad/LazyFrame"


export default function EHome(){
    return(
        <div>
            <LazyFrame fullViewport threshold={0.2}>
                <MtzHero/>
            </LazyFrame>
            <LazyFrame fullViewport threshold={0.2}>
                <OutsProds/>
            </LazyFrame>
        </div>
    ) 
}