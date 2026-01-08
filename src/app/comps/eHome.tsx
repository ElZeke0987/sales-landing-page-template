import MtzHero from "./mtz-hero/mtzHero";
import OutsProds from "./epic-outstanding-prods/outsProds"
import LazyFrame from "./reusable/LazyLoad/LazyFrame"


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