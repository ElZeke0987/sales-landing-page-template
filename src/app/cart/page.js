"use client";

import { useEffect, useState } from "react";
import { useCart } from "../cartProvider"
import Header from "../comps/sections/Header/Header";
import "./cartStyles.scss";
import { delivery, taxes } from "@/global-vars";

let firstRender=true;

function QuantityChanger({quantState, setQuantState, maxQuantity}){
    
    function handleChangeQuantity(operation){
        setQuantState(prev=>{
            if(prev<=0&&operation=="-" ) return 0;
            if(prev>=maxQuantity&&operation=="+") return maxQuantity;
            return operation=="+"?prev+1:prev-1;
        })
    }

    return(<div className="quantity-handler flex justify-center item-col">
        <button onClick={()=>handleChangeQuantity("-")} className="left-edge">-</button>
        <div className="quant-viewer">{quantState}</div>
        <button onClick={()=>handleChangeQuantity("+")} className="right-edge">+</button>
    </div>)
}
// La variable 'item' aquí representa un objeto individual dentro del carrito de compras (cart).
// Este objeto contiene información relevante sobre el producto añadido al carrito, como por ejemplo:
// - item.item: contiene los detalles del producto (nombre, precio, imagen, etc.)
// - item.quantity: la cantidad seleccionada de este producto en el carrito
// Por lo tanto, 'item' es un elemento de la lista del carrito, permitiendo renderizar y manipular cada producto del carrito individualmente.

function ItemRow({item, i, setSubTotal, cartList}){
    const [quantState, setQuantState]=useState(item.quantity);
    /*useEffect(()=>{
        item.quantity = quantState;
    },[quantState])*/

    console.log("Item: ", item)
    const toFix=item.price * quantState;
    
    const fixedNum= toFix.toFixed(2);

    useEffect(()=>{
        console.log("CartList: ", cartList)
        item.quantity=quantState;
            setSubTotal(0);
            setSubTotal(pv=>{
                let toRet=pv||0;
                if(cartList.length==0)return 0;
                cartList?.forEach(itemInCart => {
                    const totalPrice = itemInCart.quantity * itemInCart.price;
                    const fixed=totalPrice.toFixed(2)
                    const parsedFix=parseFloat(fixed);
                    toRet+=parsedFix;
                }) 
                return toRet.toFixed(2);
            });
        
    },[quantState, cartList])

    return(
        <div className="item-row flex w-full real-item">
            <div className="item-principal item-col flex justify-start items-center">{item.title}</div>
            <div className="item-price item-col flex justify-center items-center">${item.price}</div>
            <QuantityChanger quantState={quantState} setQuantState={setQuantState} maxQuantity={item.stock}/>
            <div className="item-total item-col flex justify-end items-center">${fixedNum}</div>
        </div>
    )
}

export default function CartPage(){
    const { cart, addToCart, clearCart } = useCart();
    const [subTotal, setSubTotal]=useState(0);
   /* useEffect(()=>{
        if(firstRender)//addToCart({item:{title:"Hola"}})
        firstRender=false;
    },[cart])*/
    
    const [netTotal, setNetTotal]=useState(0);

    useEffect(()=>{

        const percentTaxes=(subTotal / 100 * taxes)
        const taxesFixed=parseFloat(percentTaxes.toFixed(2));
        const deliveryFixed=delivery;
        const subTotalFixed=parseFloat(subTotal)
        const finalValue=taxesFixed+subTotalFixed+delivery;
        const finalFixed=finalValue.toFixed(2);
        setNetTotal(finalFixed)
        localStorage.setItem('subTotal', JSON.stringify({subTotal}))
    },[subTotal])

    return(<div>
            <Header/>
            <h1 className="cart-title text-4xl w-full text-center">Your cart ({cart.length} {cart.length==1?"item":"items"})</h1>
            <div className="flex justify-center items-center w-full flex-col">
                <div className="cart-grid">
                    <div className="item-row flex w-full">
                        <div className="item-principal item-col flex justify-start items-center">Item</div>
                        <div className="item-price item-col flex justify-center items-center">Precio($)</div>
                        <div className="quantity-handler item-col flex justify-center items-center">Cantidad(N)</div>
                        <div className="item-total item-col flex justify-start items-center" >Total( $ x N )</div>
                    </div>
                    {cart?.map((item, i)=>{
                        
                        return (<ItemRow item={item} i={i} key={i} setSubTotal={setSubTotal} cartList={cart}/>)

                    })}
                </div>
                <div className="cart-options">
                    <button onClick={()=>clearCart(setSubTotal)} className="clear-button">Clear cart</button>
                </div>
                <div className="cart-totals-cont flex justify-center items-end flex-col">
                    <div className="cart-totals flex flex-col">
                        <div className="totals-values-cont grid flex-col align-center ">
                            <div className="sub-total price-row"><span className="price-row-title">Sub total:</span> <span className="price-row-n">${subTotal}</span></div>
                            <div className="taxes price-row"><span className="price-row-title">Taxes:</span> <span className="price-row-n">{taxes}%</span></div>
                            <div className="delivery price-row"><span className="price-row-title">Delivery:</span> <span className="price-row-n">${delivery}</span></div>
                            <div className="net-total price-row"><span className="price-row-title">Total neto:</span> <span className="price-row-n">${netTotal}</span></div>
                        </div>
                            
                    </div>
                    <a href="/payment" className="checkout-btn">Checkout</a>
                </div>
            
        </div>
            
        
        
    </div>)
}