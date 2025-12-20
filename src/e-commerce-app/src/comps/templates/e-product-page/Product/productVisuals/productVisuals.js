import Carousel from "@/app/comps/reusable/Carousel/Carousel";
import Image from "next/image";
import ImageSelectFrame from "./imageSelectFrame";

function handleItemClick(e, objecto, index, objOptItem, setObjOptElement, carouselIdSel,setCarouselIdSel){
    
    setObjOptElement(objecto);
    setCarouselIdSel(objecto.id);
    console.log(index, "objecto: ", objecto)
    console.log(" Img sel in certain cases",objOptItem)
    
}

export default function ProductVisuals({objOpt, imgSel, setImgSel}){
    
    console.log("testing again, objop:", objOpt.extraImages[1].length)
    return(
        <div className="flex flex-col product-visuals">
            <div className="product-image-cont flex justify-center items-center">
                <Image src={objOpt.extraImages[imgSel?.id||0].imgUrl||objOpt.extraImages[imgSel?.id||0].url} width={1000} height={1000} alt="Imagen del Producto" className="rounded-lg shadow-lg bg-gray-100" quality={1000}/>
            </div>
            
            <div className="products-types-carousel">
                {(objOpt.extraImages[1].length!=0)&&
                    <Carousel objList={objOpt.extraImages} Element={ImageSelectFrame} objOpt={imgSel} setObjOpt={setImgSel} carouselListContClasses={"scroll-modern-mini-x no-hover-scroll"} selControls={true} centerAlwaysItems={false} onItemClick={handleItemClick}/>
                }
            </div>
        </div>
    )
}