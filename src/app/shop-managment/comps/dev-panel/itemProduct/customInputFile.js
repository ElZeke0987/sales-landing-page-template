
import { useRef, useState } from "react";


export default function CustomInputFile({images,setImages, multipleImgs}) {
    const fileInputRef = useRef(null);
    const [hoveringPreviewImage, setHoveringPreviewImage] = useState(false);
    
    function handleImageChange(e){  
            const files = e.target.files;
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve({
                            name: files[i].name,
                            url: reader.result
                        });
                    };
                    reader.onerror = () => {
                        reject(new Error('Error reading file'));
                    };
                    reader.readAsDataURL(files[i]);
                }));
            }
            Promise.all(promises).then((imgs) => {
                setImages(imgs);
            }).catch((error) => {
                console.error(error);
            });
        }
    
    return <div className="">
        {images.length>0&&
            multipleImgs?
            <div>
                {images.map((image,index)=>{
                    return <div className="relative flex justify-center items-center" key={index} onMouseEnter={()=>setHoveringPreviewImage(true)} onMouseLeave={()=>setHoveringPreviewImage(false)}>
                        <img className="preview-add-product-img" src={image.url} ></img>
                        {hoveringPreviewImage&&
                        <p className="absolute top-0 left-0 z-10 bg-black text-white w-full h-full flex justify-end items-start p-1 on-hover-back">
                            <button className="bg-red-500 text-white p-1 rounded" onClick={()=>setImages([])}>X</button>
                        </p>}
                    </div>
                })}
            </div>                
            :<div className="relative flex justify-center items-center" onMouseEnter={()=>setHoveringPreviewImage(true)} onMouseLeave={()=>setHoveringPreviewImage(false)}>
                <img className="preview-add-product-img" src={images[0]?.url} ></img>
                {hoveringPreviewImage&&
                <p className="absolute top-0 left-0 z-10 bg-black text-white w-full h-full flex justify-end items-start p-1 on-hover-back">
                    <button className="bg-red-500 text-white p-1 rounded" onClick={()=>setImages([])}>X</button>
                </p>}
            </div>
        }
        {(images.length===0||multipleImgs)&&<>
            <input type="file" onChange={handleImageChange} ref={fileInputRef}/>
            
            <button className="custom-input-file-button" onClick={()=>fileInputRef.current.click()}>+</button>
        </>}
    </div>;
}