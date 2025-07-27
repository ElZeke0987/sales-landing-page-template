import Carousel from "@/app/comps/reusable/Carousel/Carousel";
import Image from "next/image";
import ImageSelectFrame from "./imageSelectFrame";

function handleItemClick(e, objecto, index, objOptItem, setObjOptElement, carouselIdSel,setCarouselIdSel){
    setObjOptElement(objecto);
    setCarouselIdSel(objecto.id);
    console.log(index, "objecto: ", objecto)
}

export default function ProductVisuals({objOpt, imgSel, setImgSel}){



    return(
        <div className="flex flex-col product-visuals">
            <div className="product-image-cont flex justify-center items-center">
                <Image src={objOpt.imgList[imgSel?.id].imgUrl} width={500} height={500} alt="Imagen del Producto" className="rounded-lg shadow-lg bg-gray-100"/>
            </div>
            
            <div className="products-types-carousel">
                <Carousel objList={objOpt.imgList} Element={ImageSelectFrame} objOpt={imgSel} setObjOpt={setImgSel} carouselListContClasses={"scroll-modern-mini-x no-hover-scroll"} selControls={true} centerAlwaysItems={false} onItemClick={handleItemClick}/>
            </div>
        </div>
    )
}