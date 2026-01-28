import TypeItem from "../../typeItem/typeItem";
import useFilterStore from "../base/filterStore"
import { useEffect } from "react";
import "./styles/filterList.scss";
import { fetchCategories } from "../base/filterVars";
export default function FilterList(){
    const {filters, setCategory} = useFilterStore();
    
    
    useEffect(() => {
        
        console.log("FilterList: ", filters)
       // fetchCategories(setCategory);
       
    }, []);
   
    return(
    <div className="flex filter-list">
    
        {filters?.category.map((catObj, i)=>{
                return(
                <div key={i}>
                    <TypeItem typeObj={catObj} propVal="name_id" propTxt="name" propAct="act"/>
                </div>
                   
                )
            })
        } 
    </div>)
}