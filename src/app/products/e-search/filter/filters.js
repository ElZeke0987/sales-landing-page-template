"use client";
import FilterButton, { useOpenFilter } from "./comps/buttonFilter";
import FilterMenu from "./comps/filterMenu";
import useFilterStore from "@/stores/filterStore";
import { useEffect, useState } from "react";
import { fetchCategories } from "@/stores/filterVars";

export default function Filters(){ 
    const { openState } = useOpenFilter();
    const { filters, setCategory } = useFilterStore();
    console.log("Filters", filters)
    const [categories, setCategories]=useState([])
    const [categoriesFetched, setCategoriesFetched]=useState(false)
    useEffect(()=>{
        const result = async () => {
            if(categoriesFetched)return;
            const categories = await fetchCategories(setCategory)
            setCategory(categories)
            setCategories(categories)
            setCategoriesFetched(true)
        }
        
        result()
    },[])
    return(
        <section className="">
            <div className="relative relative-field ">
                 <FilterButton/>
                
                {
                    openState&&<FilterMenu categories={categories}/>
                } 
                {/* <FilterList/> */}
            </div>
            
        </section>
    )
}
