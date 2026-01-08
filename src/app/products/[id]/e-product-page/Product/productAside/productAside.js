import ProductButtons from "./productButtons";
import ProductInfo from "./productInfo";

export default function ProductAside({objOpt}){
    return(
        <div className="flex flex-col justify-around product-info-sub">
            <ProductInfo objOpt={objOpt}/>
            <ProductButtons objOpt={objOpt}/>
        </div>
    )
}