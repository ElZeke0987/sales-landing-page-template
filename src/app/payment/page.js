"use client";

import { useState } from "react";
import  Header  from "../comps/sections/Header/Header";
import "./payment.scss";

export default function PaymentSections(){
    const [payMethod, setPayMethod]=useState("bank")
    function handlePayMethodClick(method){
        setPayMethod(method)
    }

    return(
    <div>
        <Header/>
        <h1 className="w-full flex justify-center">Complete your payment</h1>
        <div className="w-full flex justify-center flex-col items-center">
            <h1>Pay Methods</h1>
            <div className="flex methods-btns" >
                <button onClick={e=>handlePayMethodClick(e.target.id)} id="bank" className={payMethod=="bank"&&"method-active"}>
                    Bank
                </button>
                <button onClick={e=>handlePayMethodClick(e.target.id)} id="digital" className={payMethod=="digital"&&"method-active"}>
                    Digital Wallet
                </button>
            </div>
        </div>
        <div className="flex">
            {payMethod=="bank"&&<div className="card-info">
                banco
            </div>}
            {payMethod=="digital"&&<div className="digital-methods">
                    digital metods
            </div>}
        </div>
    </div>)
}