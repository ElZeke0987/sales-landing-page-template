import { exampleProducts } from "../examplesProducts"
import { create } from "zustand"
export const useProductIdStore=create(set=>({
    id: undefined,
    prodObj: undefined,
    setNewId: (newId)=> set((state)=>({...state, id: newId, prodObj: exampleProducts.find(prod=> prod.id===newId)}))
}))