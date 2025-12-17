import { create } from "zustand"
import { newProductList } from "@/e-commerce-app/src/comps/templates/e-search/filter/base/productsBase"

export const useProductIdStore = create(set => ({
    id: undefined,
    prodObj: undefined,
    setNewId: async (newId) => {
        const products = await newProductList();
        console.log("Current id: ", newId)
        console.log("Products: ", products)
        console.log("Product object: ", products?.find(prod => prod.id === newId))
        set(state => {
            console.log("State before update: ", state)
            return{
            ...state,
            id: newId,
            prodObj: products?.find(prod => prod.id === newId)
            }
        });
        
    }
}))


