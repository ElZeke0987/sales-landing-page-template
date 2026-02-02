
import { useEffect, useRef } from "react";
import {MultipleImgsCell, SingleImgCell} from "./ImgsCell";

export default function CustomInputFile({images,setImages, multipleImgs, defaultImg}) {
    const fileInputRef = useRef(null);
    
    useEffect(()=>{
        console.log("images",images)
    },[images])
    function handleImageChange(e){  
            const files = e.target.files;
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve({
                            id: i,
                            name: files[i].name,
                            url: reader.result||""
                        });
                    };
                    reader.onerror = () => {
                        reject(new Error('Error reading file'));
                    };
                    reader.readAsDataURL(files[i]);
                }));
            }
            Promise.all(promises).then((imgs) => {
                console.log("imgs in promise",imgs)


                const filteredImgs = new Array(imgs.length);
                for(let i=0;i<imgs.length;i++){
                    if(imgs[i].url!=""){
                        filteredImgs[i] = imgs[i].url;
                    }
                }
                console.log("filteredImgs ",filteredImgs)
                multipleImgs?setImages(images.concat(filteredImgs)):setImages(filteredImgs[0]);
            }).catch((error) => {
                console.error(error);
            });

        }
    
    return <div className="">
        {images.length>0&&<div>
            {multipleImgs?
            <MultipleImgsCell images={images} setImages={setImages} />              
            :<SingleImgCell images={images} setImages={setImages} />}
        </div>}
        {(images.length===0||multipleImgs)&&<div>
            <input type="file" multiple={true} onChange={handleImageChange} ref={fileInputRef}/>
            
            <button className="custom-input-file-button" onClick={()=>fileInputRef.current.click()}>+</button>
        </div>}
    </div>
}