"use client";
import { useState, useEffect, useRef } from "react";
import "./carousel.scss";

function getTranslateX(carouselId){
    if(window==undefined) return
    
    if(window.innerWidth<768){
        return `-${((carouselId-1) * 100)}%`
    }else{
         return `-${((carouselId-1) * 22)}vw`
    }
}

export default function Carousel({objList, Element, arrows=true , setObjOpt,carouselContainerClasses, carouselListContClasses, carouselListClasses}){
    const [nextCarouselId, setNextCarouselId]=useState();
    const [carouselId, setCarouselId]=useState(1);
    const [prevCarouselId, setPrevCarouselId]=useState();
    const [isAnimating, setIsAnimating]=useState(0);
    const carouselDyn=useRef(null);
    const carouselCenterItem=useRef(null);

    useEffect(()=>{
        setNextCarouselId(carouselId+1);
        setPrevCarouselId(carouselId-1);
        
        if(carouselCenterItem){
            
            const parentList = carouselDyn.current;
            const childCenter= carouselCenterItem.current;
            console.log("Test of childCenter: ", carouselId,childCenter);
            if(!childCenter) {return}
            const childDims = childCenter.getBoundingClientRect();
            //const parentDims = parentList.getBoundingClientRect();
            
            const centeredOnX = childDims.width / 2;

            console.log("testing dims: ", childDims)
            const offSetX = centeredOnX * carouselId;

            parentList.style.transform = `translateX(-${offSetX}px)`
        }
    },[carouselId])

    useEffect(()=>{
        //setTimeout(()=>{},3000)
        //setIsAnimating(0);
    },[isAnimating])

    function handleIndChange(dir){
        console.log("Changing carousel")
        setIsAnimating(dir=="next"?1:2);
        
        setCarouselId((prev)=>{
            if(prev==0 &&dir=="prev")return objList.length+1
            else if(prev==objList.length+1&&dir=="next")return 0
            else return dir=="next"?prev+1:prev-1;

        })
    }
    //console.log("testing objList: ", objList)
    //style={{transform: `translateX(${getTranslateX(carouselId)})`}}
    return(
    <div className={"carousel-container w-full flex justify-center "+carouselContainerClasses}>
        {arrows&&<button onClick={()=>handleIndChange("prev")} className="carousel-arrow arrow-prev w-10 ">{"<"}</button>}
        <div className={"carousel-list-cont md:flex md:justify-center "+carouselListContClasses}>
            <div ref={ carouselDyn} className={"carousel-list flex flex-row px-4 "+carouselListClasses}  onClick={()=>console.log("Click on testimonials section test")}>
                {objList.map((obj, i)=>{
                    return(
                        <div ref={carouselCenterItem} key={i}>
                            <Element obj={obj} i={i} setObjOpt={setObjOpt}  />
                        </div>
                    
                    )
                })}
            </div>
        </div>
        {arrows&&<button onClick={()=>handleIndChange("next")} className="carousel-arrow w-10 arrow-next ">{">"}</button>}
    </div>
    )
}