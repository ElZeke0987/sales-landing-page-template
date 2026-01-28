import { create } from "zustand"
import { newProductList } from "@/app/products/e-search/filter/base/productsBase"
import { ProductForClient } from "@/types/global"

export const useProductIdStore = create(set => ({
    id: undefined,
    prodObj: undefined,
    setNewId: async (newId: number) => {
        const products = await newProductList();
        console.log("Current id: ", newId)
        console.log("Products: ", products)
        console.log("Product object: ", products?.find((prod: ProductForClient) => prod.id === newId))
        set((state: { id: number | undefined; prodObj: ProductForClient | undefined; }) => {
            console.log("State before update: ", state)
            return{
            ...state,
            id: newId,
            prodObj: products?.find((prod: ProductForClient) => prod.id === newId)
            }
        });
        
    }
}))


