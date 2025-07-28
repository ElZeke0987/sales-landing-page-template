"use client";

import { useEffect, useState } from "react";
import  Header  from "../comps/sections/Header/Header";
import "./payment.scss";

import { TotalCard } from "./comps/totalsCard/totalCard";
import { ShippingForm } from "./comps/formPayment/shippingForm";
import { PaymentForm } from "./comps/formPayment/paymentForm";

export default function PaymentSections(){
    const [payMethod, setPayMethod]=useState("bank")
    const [sectProgress, setSectProgress]=useState("shipping")
    function handlePayMethodClick(method){
        setPayMethod(method)
    }
    async function handleTestFetch(){
        const body={
            method: payMethod
        }
        const response=await fetch("/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const data=await response.json()
        console.log(data)
    }    
   
    return(
    <div>
        <Header/>
        <h1 className="w-full flex justify-center">Complete your payment</h1>

        
        <div className="flex payment-container w-full">
            <div className="flex payment-section">
                <button onClick={()=>setSectProgress("shipping")}>Shipping</button>
                <button onClick={()=>setSectProgress("payment")}>Payment</button>
                {sectProgress=="shipping"&&<ShippingForm/>}
                {sectProgress=="payment"&&<PaymentForm/>}
                <div className="digital-methods">
                    
                </div>
            </div>
            <TotalCard/>
        </div>
    </div>)
}