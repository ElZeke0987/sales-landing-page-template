import { create } from "zustand"
import { newProductList } from "@/globalMods/productBase"
import { ProductForClient } from "@/types/privateTypes";

export const useProductIdStore = create(set => ({
    id: undefined,
    prodObj: undefined,
    setNewId: async (newId: number) => {
        const products = await newProductList();
        //console.log("Current id: ", newId)
        //console.log("Products: ", products)
        //console.log("Product object: ", products?.find((prod: ProductForClient) => prod.id === newId))
        set((state: { id: number | undefined; prodObj: ProductForClient | undefined; }) => {
            //console.log("State before update: ", state)
            return{
            ...state,
            id: newId,
            prodObj: products?.find((prod: ProductForClient) => prod.id === newId)
            }
        });
        
    }
}))

type ProductListStore = {
  products: ProductForClient[];
  setProducts: () => Promise<ProductForClient[]>;
  getProductByNameId: (nameId: string) => Promise<ProductForClient | undefined>;
};

export const useProductListStore = create<ProductListStore>((set, get) => ({
  products: [],

  setProducts: async () => {
    
    const products = await newProductList();
    if(!products) {
      console.error("No se encontraron productos en la peticion")
      return []
    };
    //console.log("Setting products...", products);
    set({ products });
    return products;
  },

  getProductByNameId: async (nameId) => {
    const products = get().products;
    //console.log("Getting products: ", products);
    if(!products||products.length === 0) {
      //console.log("No products found\n Fetching again");
      const newProductsFetched: ProductForClient[] = await get().setProducts();
      return newProductsFetched.find(p => p.name_id === nameId) ;
    };
    return products.find(p => p.name_id === nameId);
  }
}));
