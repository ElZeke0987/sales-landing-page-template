"use client"
import ItemFilter from "./item-filter/ItemFilter";

export default function FilterList({filters}) {
    return <ul className="dev-panel-filters">
        {(filters!==undefined&&filters.length>0)&&filters.map((filter)=>{
            return <ItemFilter key={filter.id} filter={filter}/>
        })}
    </ul>;
}