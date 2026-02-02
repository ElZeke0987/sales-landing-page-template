import TypeItem from "../../typeItem/typeItem";
import useFilterStore from "@/stores/filterStore"
import { useEffect, useState } from "react";
import "./styles/filterList.scss";
import { fetchCategories } from "@/stores/filterVars";
export default function FilterList({categories}){
    const {setCategory}=useFilterStore();

    
    

    return(
    <div className="flex filter-list w-full flex-wrap gap-2 justify-center ">
        {categories.map((catObj, i)=>{
                return(
                <div key={i}>
                    <TypeItem typeObj={catObj} propVal="name_id" propTxt="name" propAct="act"/>
                </div>
                   
                )
            })
        } 
    </div>)
}