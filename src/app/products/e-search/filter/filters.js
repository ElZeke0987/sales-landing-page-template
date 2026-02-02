"use client";
import FilterButton, { useOpenFilter } from "./comps/buttonFilter";
import FilterMenu from "./comps/filterMenu";
import FilterList from "./comps/filterList";

export default function Filters(){ 
    return(
        <section className="w-full">
            <div className="relative relative-field w-full">
                {/* <FilterButton/>
                
                {
                    openState&&<FilterMenu/>
                } */}
                <FilterList/>
            </div>
            
        </section>
    )
}
