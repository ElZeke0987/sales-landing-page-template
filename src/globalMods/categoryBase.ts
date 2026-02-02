import { Category } from "@/types/privateTypes";
import { SetStateAction } from "react";
import { supabase } from "@/app/supabaseClient.config";

let actuallySendedFetch=false
export const fetchCategories=async(setCategory?:(value:SetStateAction<Category[]>)=>void)=>{
    if(actuallySendedFetch)return;
    actuallySendedFetch=true;
    const res = await supabase.from("categories").select("*");
    const data = res.data
    if(!data){
        console.error("No categories found or request returned null from DB")
        return
    }
    const categories=data?.map((item)=>{
        return{
            ...item,
            
            act: false
        }
    })

    //console.log("data test", categories)
    if(setCategory)setCategory(categories)
    return categories
}