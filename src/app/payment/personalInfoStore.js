

import { create } from "zustand";
import { useCart } from "../cartProvider";
function getCartItemIds(cart){
    return cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
        extId: item.extId
    }));
}
export const usePersonalInfoStore=create((set)=>({
    email:"",
    setEmail:(email)=>set({email}),
    firstName:"",
    setFirstName:(firstName)=>set({firstName}),
    lastName:"",
    setLastName:(lastName)=>set({lastName}),
    phone:"",
    setPhone:(phone)=>set({phone}),
    address:"",
    setAddress:(address)=>set({address}),
    city:"",
    setCity:(city)=>set({city}),
    state:"",
    setState:(state)=>set({state}),
    zip:"",
    setZip:(zip)=>set({zip}),
    country:"",
    setCountry:(country)=>set({country}),
    getShippingPrice:async(cart)=>{
        console.log("getCartItemIds: ",getCartItemIds(cart))
        const response=await fetch("/api/shipping-rate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                recipient:{
                    "country-code": this.country,
                    "state-code": this.state,
                    "city": this.city,
                    "zip": this.zip,
                    "address": this.address,
                    "phone": this.phone,
                    "email": this.email,
                    "name": this.firstName+" "+this.lastName
                }, 
                itemsIdsToBeProccesed: getCartItemIds(cart)
            })
        })
        const data=await response.json()
        console.log(data)
    }
}))
