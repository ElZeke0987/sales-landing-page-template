import { delivery, taxes } from "@/global-vars";
import { useEffect, useState } from "react";
import "./totalCard.scss";

export function TotalCard(){
    const [subTotal, setSubTotal]=useState(0);
    const [netTotal, setNetTotal]=useState(0)
    useEffect(()=>{
        const parsedSubTotal=JSON.parse(localStorage.getItem('subTotal')).subTotal;
        console.log("parsed subTotal: ", parsedSubTotal)
        setSubTotal(parsedSubTotal)
    },[])
    
    useEffect(()=>{

        const percentTaxes=(subTotal / 100 * taxes)

        const finalValue=parseFloat(percentTaxes)+parseFloat(subTotal)+parseFloat(delivery);
        const finalFixed=finalValue.toFixed(2);
        console.log("testing values in adding: ", subTotal)
        setNetTotal(finalFixed)
    },[subTotal])
    return(
        <div className="cart-totals-cont flex ">
                <div className="cart-totals flex flex-col">
                    <div className="totals-values-cont grid flex-col align-center ">
                        <div className="sub-total price-row"><span className="price-row-title">Sub total:</span> <span className="price-row-n">${subTotal}</span></div>
                        <div className="taxes price-row"><span className="price-row-title">Taxes:</span> <span className="price-row-n">{taxes}%</span></div>
                        <div className="delivery price-row"><span className="price-row-title">Delivery:</span> <span className="price-row-n">${delivery}</span></div>
                        <div className="net-total price-row"><span className="price-row-title">Total neto:</span> <span className="price-row-n">${netTotal}</span></div>
                    </div>
                        
                </div>
            </div>
    )
}