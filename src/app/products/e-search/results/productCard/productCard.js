import Image from "next/image";
import "./productCard.scss";
import useFilterStore from "../../filter/base/filterStore";
import TypeItem from "../../typeItem/typeItem";
import Link from "next/link";
import { useProductIdStore } from "@/app/products/[id]/productStore";
import { useEffect, useState } from "react";

export default function ProductCard({productObj}){
    const { addCategory, filters, productList }=useFilterStore();
    const { setNewId } = useProductIdStore();
    const [categoryOfThisProduct, setCategoryOfThisProduct] = useState(null);

    useEffect(()=>{
        console.log("testing categories: ", filters.category, productList)
        // Find the category object that matches the product's category_id
        const category = filters.category.find(cat => cat.id === productObj.category_id);
        setCategoryOfThisProduct(category);
    }, [filters])

    const defaultImage = "";
   // console.log("testing categories: ", filters.category, productList)

   function handleProductCardClick(e){
        if(!e.target.closest(".type")){
            setNewId(productObj);
            //window.location.href=`/products/${productObj.name_id}`;
        }
   }
    return(
        <article className="flex md:flex-row flex-col product-wh">
            <Image src={productObj.thumbnail_url == null ? defaultImage : productObj?.thumbnail_url||productObj?.imgList[0].imgUrl} width={200} height={200} alt={productObj.name||productObj.title}/>
            <div className="product-card-info flex h-full w-full flex-col justify-center" onClick={handleProductCardClick}>
                <Link href={`/products/${productObj.name_id}`} key={productObj.name_id}>
                    <div className="price ">${productObj.price} USD</div>
                    <div className="title counter-color">{productObj.name||productObj.title}</div>
                    <div className="desc counter-color">{productObj.description||productObj.desc}</div>
                </Link>
                <TypeItem typeObj={categoryOfThisProduct} propAct="actCategory"/>
            </div>
                
        </article>
    )
}