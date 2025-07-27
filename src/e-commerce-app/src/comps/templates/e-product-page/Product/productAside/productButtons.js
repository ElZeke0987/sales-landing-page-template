

import { addToCartSystem } from "@/global-vars"
import BuyBenefits from "./buyBenefits";
import CustomSelect from "@/app/comps/reusable/customSelect/customSelect";
import {useState} from "react";
import { useCart } from "@/app/cartProvider";


//objOpt es el objeto que se pasa como prop desde el archivo product.jsx,
//que es el principal archivo de este componente, y que contiene toda la informacion
//de un producto, como su titulo, precio, url de la imagen, stock, etc.
//En este archivo, se utiliza objOpt para obtener los valores de stock y 
//el titulo del producto, y se utiliza para setear el valor de quantitySel
//que es el estado que se utiliza para guardar el valor seleccionado
//en el select de stock, y que se utiliza para llamar a la funcion addToCart.

export default function ProductButtons({objOpt}){
    const stockNumbers=Array.from({length: objOpt?.stock<objOpt.buyLimit?objOpt.stock:objOpt.buyLimit}, (_,i)=>{return {val:i+1, txt: `${i+1} unidades`}});
    const [quantitySel, setQuantitySel]=useState({val: 1});
    const { addToCart, cart } = useCart()
    function changeStockQuantity(e){
        setQuantitySel(e)
    }
    return(
        <div className="product-buy-cont flex flex-col">
            {
                objOpt.stock<=3&&<div className="low-stock-msg">There's only  {objOpt.stock} in stock <span className="stock-highlighted-cta">¡Buy Now!</span> </div>
            }
            <CustomSelect opts={stockNumbers} defaultText="1 unidad" defaultValue={1} clases="stock-select cus-select-open-natural" onSelect={changeStockQuantity} onEffectPar={objOpt} handleEffectPar={(_, setQuantTo0)=>setQuantTo0({val: 1, txt: "1 unidad"})}/>
            <BuyBenefits/>
            <div className="flex flex-col items-center product-buy-buttons">
                <button className="buy-now button-buy">Buy Now</button>
                {addToCartSystem&& <button className="add-to-cart button-buy" onClick={()=>addToCart(objOpt, quantitySel.val)}>Add to cart</button>}
            </div>
            
        </div>
    )
}