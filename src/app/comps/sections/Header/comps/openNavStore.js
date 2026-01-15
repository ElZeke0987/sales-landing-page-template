import { create } from "zustand";

export const useOpenNavStore=create(set=>{

    return {
        navOpen: false,
        setNavOpen: (signal)=>{
            set(state=>({...state, navOpen: signal}));
        }
    }
})
