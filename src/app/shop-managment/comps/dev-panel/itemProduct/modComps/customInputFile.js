
import { useEffect, useRef } from "react";
import {MultipleImgsCell, SingleImgCell} from "./ImgsCell";

export default function CustomInputFile({images,setImages, multipleImgs, defaultImg}) {
    const fileInputRef = useRef(null);
    
    useEffect(()=>{
        console.log("images",images)
    },[images])
    function handleImageChange(e){  
            const files = Array.from(e.target.files);
            const previews = files.map((file, i) => ({
                id: i,
                name: file.name,
                file, // 👈 guardamos el File REAL
                preview: URL.createObjectURL(file) // 👈 solo para mostrar
            }))
            console.log("previews",previews)
            multipleImgs
                ? setImages(prev => [...prev, ...previews])
                : setImages(previews[0]);

        }
    
    return <div className="">
        {images.length>0&&<div>
            {multipleImgs?
            <MultipleImgsCell images={images} setImages={setImages} />              
            :<SingleImgCell images={images} setImages={setImages} />}
        </div>}
        {(images.length===0||multipleImgs)&&<div>
            <input type="file" className="hidden" multiple={true} onChange={handleImageChange} ref={fileInputRef}/>
            
            <button className="custom-input-file-button" onClick={()=>fileInputRef.current.click()}>+</button>
        </div>}
    </div>
}