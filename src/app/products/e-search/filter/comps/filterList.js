import TypeItem from "../../typeItem/typeItem";
import useFilterStore from "@/stores/filterStore"
import { useEffect } from "react";
import "./styles/filterList.scss";
import { fetchCategories } from "@/stores/filterVars";
export default function FilterList(){
    const {filters, setCategory}=useFilterStore();
    useEffect(()=>{
        console.log("now filters: ", filters)
        const result = async () => {
            const categories = await fetchCategories(setCategory)
            setCategory(categories)
        }
        result()
    },[])
   
    return(
    <div className="flex filter-list w-full flex-wrap gap-2 justify-center">
    
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