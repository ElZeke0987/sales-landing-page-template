"use client";

import { useEffect, useState } from "react";
import { useCart } from "../cartProvider"
import Header from "../comps/sections/Header/Header";
import "./cartStyles.scss";

let firstRender=true;

function QuantityChanger({quantState, setQuantState, maxQuantity}){
    
    function handleChangeQuantity(operation){
        setQuantState(prev=>{
            if(prev<=0&&operation=="-" ) return 0;
            if(prev>=maxQuantity+1) return maxQuantity;
            return operation=="+"?prev+1:prev-1;
        })
    }

    return(<div className="quantity-handler flex justify-center item-col">
        <button onClick={()=>handleChangeQuantity("-")} className="left-edge">-</button>
        <div className="quant-viewer">{quantState}</div>
        <button onClick={()=>handleChangeQuantity("+")} className="right-edge">+</button>
    </div>)
}

function ItemRow({item, i, setSubTotal}){
    const [quantState, setQuantState]=useState(item.quantity);
    /*useEffect(()=>{
        item.quantity = quantState;
    },[quantState])*/
    const toFix=item.item.price * quantState;
    const fixedNum= toFix.toFixed(2);
    return(
        <div className="item-row flex w-full real-item">
            <div className="item-principal item-col flex justify-start items-center">{item.item.title}</div>
            <div className="item-price item-col flex justify-center items-center">${item.item.price}</div>
            <QuantityChanger quantState={quantState} setQuantState={setQuantState} maxQuantity={item.item.stock}/>
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
                    /* setSubTotal(pv=>{
                        const toFix=item.item.price * item.quantity;
                        const fixedNum= toFix.toFixed(2);
                        return pv + fixedNum;
                    }) */
                    return (<ItemRow item={item} i={i} key={i}/>)

                })}
            </div>
            <div className="cart-options">
                <button onClick={clearCart} className="clear-button">Clear cart</button>
            </div>
            <div className="cart-totals">
                <div>Sub total: {subTotal}</div>
            </div>
        </div>
            
        
        
    </div>)
}