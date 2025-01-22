"use client";

import  { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = ()=>useContext(CartContext);

export function CartProvider({children}){

    const [cart, setCart]=useState([]);
    console.log("rendering cart: ", cart)

    useEffect(()=>{
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if(savedCart){
            setCart(savedCart)
        }
    },[])

    useEffect(()=>{
        if(cart.length>=0){
            
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    },[cart])

    function addToCart(item){
        setCart(prevCart=>[...prevCart, item])/*{
            console.log("adding before: ", prevCart, " new: ",  [...prevCart, item], " to cart")
            return [...prevCart, item]
        })*/
    }

    function removeFromCart(id){
        setCart(prevCart=>{return prevCart.filter(item=> item.id!==id)});
    }

    function clearCart(setSubTotal){
        setSubTotal(0);
        setCart([])
        
    }

    return(
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}