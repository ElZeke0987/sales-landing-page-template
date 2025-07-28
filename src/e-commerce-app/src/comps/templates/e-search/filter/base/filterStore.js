import { create } from "zustand";
import { filterLists } from "./filterVars";
import { exampleProducts } from "../../results/examplesProducts";
//Act = activate or set something to true as well, open&close boolean

const petProductFetch=async()=>{
    const response=await fetch("/api/get-products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    console.log(response.result)
    return new Response(JSON.stringify(await response.json()), {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

const useFilterStore = create(set=>({
    filters: {
        category: [ ...filterLists.category ],
        priceRange: [0, 1000],
        rate: 5,
    },
    setCategory: (category)=> set(state=>({filters: {...state.filters, category}})),
    setPriceRange: (range)=> set(state=>({filters: {...state.filters, priceRange: range}})),
    setRate: (rate)=> set( state=> ({...state.filters, rate})),

    productList: exampleProducts,
    setCategoryActProducts: (state)=>{
       console.log("testing: ", state.filters.category)
 

        const activeCategories=state.filters.category.filter((cat)=>cat.act);
        //console.log("active testing: ", activeCategories)
        const newProductList=
        state.productList.map((prd, i)=>{//Activate all products with categoryToAct 
            let objToReturn;

            //console.log("filtered actos", categoryToAct)
            objToReturn={...prd, actCategory: activeCategories.some(cat=>cat.val==prd.val&&cat.act)};
            return objToReturn
         })
         //console.log("new product list", newProductList);
         return{
             ...state,
             productList: newProductList,
         }
       },

    addCategory (categoryToAdd) {
        
        set(state=>{
            
            return{
                filters: {...state.filters, 
                    category: state.filters.category.map(cat => {
                        let objToReturn=cat;
                        
                        if(cat.val==categoryToAdd.val){
                            objToReturn={...cat, act: !categoryToAdd.act};
                            console.log("obj to return in a new state: ", objToReturn)
                        }
                       
                        
                        //console.log("Good Tested: ", categoryToAdd.val, cat.val, objToReturn)
                        return objToReturn
                
                    })
                }
            }
        })
        set(state=>{
            return state.setCategoryActProducts(state)
        })
        
    },

    removeCategory: (categoryToRemove) => {
        console.log("New Delete")
        
        set(state=>{
            state.setCategoryActProducts( categoryToRemove, false)
            return{filters: {...state.filters,
                category: filterLists.category.map(cat => {
                    if(cat.val==categoryToRemove){
                        console.log("Setting false to this: ", cat.val)
                        let objToReturn=cat;
                        if(objToReturn.val==categoryToRemove){
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
