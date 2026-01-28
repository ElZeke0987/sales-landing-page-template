import Image from "next/image";
import "./productCard.scss";
import useFilterStore from "../../filter/base/filterStore";
import TypeItem from "../../typeItem/typeItem";

export default function ProductCard({productObj}){
    const { addCategory, filters, productList }=useFilterStore();
    const defaultImage = "";
   // console.log("testing categories: ", filters.category, productList)

   function handleProductCardClick(e){
        if(!e.target.closest(".type")){
            window.location.href=`/products/${productObj.id}`;
        }
   }
    return(
        <article className="flex md:flex-row flex-col product-wh">
            <Image src={productObj.thumbnail_url == null ? defaultImage : productObj?.thumbnail_url||productObj?.imgList[0].imgUrl} width={200} height={200} alt={productObj.name||productObj.title}/>
            <div className="product-card-info flex h-full w-full flex-col justify-center" onClick={handleProductCardClick}>
                <div className="price ">${productObj.price} USD</div>
                <div className="title counter-color">{productObj.name||productObj.title}</div>
                <div className="desc counter-color">{productObj.description||productObj.desc}</div>
                <TypeItem typeObj={productObj} propAct="actCategory"/>
            </div>
                
        </article>
    )
}