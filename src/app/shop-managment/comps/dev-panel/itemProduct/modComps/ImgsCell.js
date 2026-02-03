
import { useEffect, useState } from "react";

export function MultipleImgsCell({images,setImages}){
    const [hoveringPreviewImage, setHoveringPreviewImage] = useState(null);
    useEffect(()=>{
        console.log("images from multiple imgs cell",images)
    },[images])
    return <div className="flex">
                {images.map((image,index)=>{
                    return <div className="relative flex justify-center items-center" key={index} onMouseEnter={()=>setHoveringPreviewImage(index)} onMouseLeave={()=>setHoveringPreviewImage(null)}>
                        <img className="preview-add-product-img" src={image} ></img>
                        {hoveringPreviewImage==index&&
                        <p className="absolute top-0 left-0 z-10 bg-black text-white w-full h-full flex justify-end items-start p-1 on-hover-back">
                            <button className="bg-red-500 text-white p-1 rounded" onClick={()=>setImages(images.filter((img)=>img.name!=image.name))}>X</button>
                        </p>}
                    </div>
                })}
            </div>  
}

export function SingleImgCell({images,setImages}){
    const [hoveringPreviewImage, setHoveringPreviewImage] = useState(false);
    useEffect(()=>{
        console.log("images from single img cell",images)
    },[images])
    console.log("images from single img cell",images)
    return <div className="relative flex justify-center items-center" onMouseEnter={()=>setHoveringPreviewImage(true)} onMouseLeave={()=>setHoveringPreviewImage(false)}>
                <img className="preview-add-product-img" src={images.preview|| images} ></img>
                {hoveringPreviewImage&&
                <p className="absolute top-0 left-0 z-10 bg-black text-white w-full h-full flex justify-end items-start p-1 on-hover-back">
                    <button className="bg-red-500 text-white p-1 rounded" onClick={()=>setImages([])}>X</button>
                </p>}
            </div>
}