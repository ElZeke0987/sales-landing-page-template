"use client";

import { useEffect, useState } from "react";
import  Header  from "../comps/sections/Header/Header";
import "./payment.scss";

import { TotalCard } from "./comps/totalsCard/totalCard";
import { ShippingForm } from "./comps/formPayment/shipping/shippingForm";

export default function PaymentSections(){
    const [payMethod, setPayMethod]=useState("bank")
    const [sectProgress, setSectProgress]=useState("shipping")
    function handlePayMethodClick(method){
        setPayMethod(method)
    }
    
   
    return(
    <div>
        <Header/>
        <h1 className="w-full flex justify-center">Complete your payment</h1>

        
        <div className="flex payment-container w-full">
            <div className="flex payment-section">
                {sectProgress=="shipping"&&<ShippingForm/>}
                {sectProgress=="payment"&&<div className="basic-info flex flex-col">
                    <div className="flex flex-col">
                        <label>Name On Card</label>
                        <input className="card-input"/>
                    </div>
                    <div className="flex flex-col">
                        <label>Card Number</label>
                        <input className="" placeholder="XXXX XXXX XXXX XXXX"/>
                    </div>
                    <div className="card-sub-info flex">
                        <div className="flex flex-col">
                            <label>Expire Date</label>
                            <input className="" placeholder="XXXX XXXX XXXX XXXX"/>
                        </div>
                        <div className="flex flex-col">
                            <label>CVV / CVC</label>
                            <input className="" placeholder="XXX"/>
                        </div>
                    </div>
                    
                </div>}
                <div className="digital-methods">
                    
                </div>
            </div>
            <TotalCard/>
        </div>
    </div>)
}