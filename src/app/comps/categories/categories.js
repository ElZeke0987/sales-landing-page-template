import SelectableFeatures from "@/app/comps/sections/Features/selectableFeatures/selectableFeatures";
import { categoryList } from "@/global-vars"

export default function Categories(){
    return (
        <div className="z-50">
            <SelectableFeatures title={"Categorias Destacadas"} items={categoryList}/>
        </div>
    )
}