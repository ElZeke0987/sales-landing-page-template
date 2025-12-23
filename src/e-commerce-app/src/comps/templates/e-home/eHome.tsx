import MtzHero from "./mtz-hero/mtzHero";
import Features from "@/app/comps/sections/Features/Features";
import { featuresList, ctaConfig } from "@/globalVars/features";
import { titlesObj } from "@/global-vars";
import OutsProds from "./epic-outstanding-prods/outsProds"
export default function EHome(){
    return(
        <div>
            <MtzHero/>
            <OutsProds/>
        </div>
    ) 
}