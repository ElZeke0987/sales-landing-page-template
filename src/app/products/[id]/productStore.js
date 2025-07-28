import { create } from "zustand"
import { newProductList } from "@/e-commerce-app/src/comps/templates/e-search/filter/base/productsBase"

export const useProductIdStore = create(set => ({
    id: undefined,
    prodObj: undefined,
    setNewId: async (newId) => {
        const products = await newProductList();
        set(state => ({
            ...state,
            id: newId,
            prodObj: products?.find(prod => prod.id === newId)
        }));
    }
}))


