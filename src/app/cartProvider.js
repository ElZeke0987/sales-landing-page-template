"use client";

import  { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = ()=>useContext(CartContext);

export function CartProvider({children}){

    const [cart, setCart]=useState([]);
    // console.log("rendering cart: ", cart)

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

    function addToCart(item, quantity=1) {
        // Actualiza el estado del carrito
        console.log("item: ", item)
        setCart(prevCart => {
            // Busca si el item ya existe en el carrito
            const index = prevCart.findIndex(cartItem => cartItem.id === item.id);
            if (index !== -1) { // Si el item ya está en el carrito
                // Crea una copia del carrito anterior
                const updatedCart = [...prevCart];
                // Suma 1 a la cantidad del producto ya existente
                updatedCart[index] = { ...updatedCart[index], quantity: updatedCart[index].quantity + quantity };
                // Retorna el carrito actualizado
                return updatedCart;
            }
            // Si el producto no está en el carrito, lo agrega con cantidad 1
            return [
                ...prevCart,
                {
                    ...item,
                    extId: item.extId,
                    quantity,
                }
            ];
        });
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
