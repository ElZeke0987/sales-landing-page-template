"use client";
import FilterButton, { useOpenFilter } from "./comps/buttonFilter";
import FilterMenu from "./comps/filterMenu";
import FilterList from "./comps/filterList";
import { useEffect } from "react";
import { fetchFilters } from "./base/filterVars";

export default function Filters(){
    const {openState}=useOpenFilter();
    useEffect(()=>{
        fetchFilters()
    },[])
    return(
        <section className="w-full">
            <div className="relative relative-field w-full">
                <FilterButton/>
                
                {
                    openState&&<FilterMenu/>
                }
                <FilterList/>
            </div>
            
        </section>
    )
}