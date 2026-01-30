import { create } from "zustand";
import { filterLists } from "./filterVars";
//Act = activate or set something to true as well, open&close boolean
import { newProductList } from "@/globalMods/productBase";
import { ProductForClient, Category } from "@/types/privateTypes";

const useFilterStore = create(set=>({
    
    filters: {
        category: [] as Category[],
        priceRange: [0, 1000],
        rate: 5,
        productList: [] as ProductForClient[],
    },

    setCategory: (category: Category[])=> set((state:any)=>({filters: {...state.filters, category}})),//Filters hadlers are these 3
    setPriceRange: (range: [number, number])=> set((state:any)=>({filters: {...state.filters, priceRange: range}})),
    setRate: (rate: number)=> set((state:any)=> ({...state.filters, rate})),
    
    
    productListByState:(state:any)=> newProductList(state),

    setCategoryActProducts: (state:any)=>{
       console.log("testing to filter product by category: ", state.filters.category)
 

        const activeCategories=state.filters.category.filter((cat:Category)=>cat.act);
        
        const newProductList= state.productList?.map((prd: ProductForClient)=>{//Activate all products with categoryToAct 
            console.log("NEW PRODUCT LIST ITEM: ", {...prd, actCategory: activeCategories.some((cat: Category)=>cat.id==prd.category_id&&cat.act)})
            return{...prd, actCategory: activeCategories.some((cat: Category)=>cat.id==prd.category_id&&cat.act)}
         })
         
         return{
             ...state,
             productList: newProductList,
         }
       },

    addCategory (categoryToAdd: Category) {
        console.log("ADDING CATEGORY: ", categoryToAdd)
        set((state:any)=>{
            
            return{
                filters: {...state.filters, 
                    category: state.filters.category.map((cat:Category) => {
                        let objToReturn=cat;
                        
                        if(cat.id==categoryToAdd.id){
                            objToReturn={...cat, act: !categoryToAdd.act};
                            console.log("obj to return in a new state: ", objToReturn)//cambia el activo e inactivo de una categoria
                        }
                       
                        
                        //console.log("Good Tested: ", categoryToAdd.val, cat.val, objToReturn)
                        return objToReturn
                
                    })
                }
            }
        })
        set((state:any)=>{
            return state.setCategoryActProducts(state)
        })
        
    },

    removeCategory: (categoryToRemove: Category) => {
        console.log("New Delete")
        
        set((state:any)=>{
            state.setCategoryActProducts( categoryToRemove, false)
            return{filters: {...state.filters,
                category: filterLists.category.map((cat:Category) => {
                    if(cat.id==categoryToRemove.id){
                        console.log("Setting false to this: ", cat.id)
                        let objToReturn=cat;
                        if(objToReturn.id==categoryToRemove.id){
                            objToReturn={...cat, act: false};
                        }
                        
                        return objToReturn;
                    }
                })
            }}
        })
        
    }
})
); 

export default useFilterStore;
