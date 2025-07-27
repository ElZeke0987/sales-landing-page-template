import MtzHero from "./mtz-hero/mtzHero";
import Features from "@/app/comps/sections/Features/Features";
import { featuresList, ctaConfig } from "@/globalVars/features";
import { titlesObj } from "@/global-vars";

export default function EHome(){
    return(
        <div>
            <MtzHero/>
            <Features 
                items={featuresList} 
                title={titlesObj.benefits} 
                cta={ctaConfig} />
        </div>
    ) 
}