"use client";
import FilterButton, { useOpenFilter } from "./comps/buttonFilter";
import FilterMenu from "./comps/filterMenu";
import FilterList from "./comps/filterList";
import { useEffect } from "react";
import { fetchCategories } from "./base/filterVars";
import useFilterStore from "./base/filterStore";

export default function Filters(){
    const {setCategory}=useFilterStore();
    const {openState}=useOpenFilter();
    useEffect(()=>{
        fetchCategories(setCategory)
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
