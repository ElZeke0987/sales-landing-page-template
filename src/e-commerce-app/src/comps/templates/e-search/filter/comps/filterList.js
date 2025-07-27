import TypeItem from "../../typeItem/typeItem";
import useFilterStore from "../base/filterStore"

import "./styles/filterList.scss";

export default function FilterList(){

    const {filters, addCategory}=useFilterStore()

    return(
    <div className="flex filter-list">
    
        {filters.category.map((catObj, i)=>{
                return(
                <div key={i}>
                    <TypeItem typeObj={catObj}/>
                </div>
                   
                )
            })
        } 
    </div>)
}