
import { useEffect, useRef } from "react";
import {MultipleImgsCell, SingleImgCell} from "./ImgsCell";



export default function CustomInputFile({images,setImages, multipleImgs}) {
    const fileInputRef = useRef(null);
    
    useEffect(()=>{
        console.log("images in custom input file",images)

    },[images])
    function handleImageChange(e){  
        const files = Array.from(e.target.files);
        console.log("files & multiple Images",files,multipleImgs)
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


    function handleTypeOfInput(){
        if(!images || images.length===0 || images==""){
            return
        }
        if(!multipleImgs){
            return <SingleImgCell images={images} setImages={setImages}/>
        }
        if(multipleImgs){
            return <MultipleImgsCell images={images} setImages={setImages}/>
        }
    }
    
    return <div className="">
        {handleTypeOfInput()}
        {(images.length===0||multipleImgs)&&<div>
            <input type="file" className="hidden" multiple={true} onChange={handleImageChange} ref={fileInputRef}/>
            
            <button className="custom-input-file-button" onClick={()=>fileInputRef.current.click()}>+</button>
        </div>}
    </div>
}