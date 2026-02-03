
import { useEffect, useState } from "react";
import Image from "next/image";

export function MultipleImgsCell({images,setImages}){
    const [hoveringPreviewImage, setHoveringPreviewImage] = useState(null);


    return <div className="flex">
                {images.map((image,index)=>{
                    return <div className="relative flex justify-center items-center" key={index} onMouseEnter={()=>setHoveringPreviewImage(index)} onMouseLeave={()=>setHoveringPreviewImage(null)}>
                        <Image className="preview-add-product-img" src={image.preview} 
                        alt="preview"
                        width={300}
                        height={300}
                        unoptimized />
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



    // console.log("images from single img cell",images)
    // console.log("typeof images",typeof images)

    return <div className="relative flex justify-center items-center" onMouseEnter={()=>setHoveringPreviewImage(true)} onMouseLeave={()=>setHoveringPreviewImage(false)}>
                {((typeof images=='object'||typeof images=='string')&&(typeof images!='array'&&images.preview))&&
                <Image className="preview-add-product-img" 
                src={images.preview}
                alt="preview"
                width={300}
                height={300}
                unoptimized />}
                {hoveringPreviewImage&&
                <p className="absolute top-0 left-0 z-10 bg-black text-white w-full h-full flex justify-end items-start p-1 on-hover-back">
                    <button className="bg-red-500 text-white p-1 rounded" onClick={()=>setImages([])}>X</button>
                </p>}
            </div>
}