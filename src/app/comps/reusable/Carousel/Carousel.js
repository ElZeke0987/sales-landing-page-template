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

export default function Carousel({objList, Element, arrows=true , setObjOpt,carouselContainerClasses, carouselListContClasses, carouselListClasses, centerAlwaysItems=true}){
    const [nextCarouselId, setNextCarouselId]=useState();
    const [carouselId, setCarouselId]=useState(1);
    const [prevCarouselId, setPrevCarouselId]=useState();
    const [isAnimating, setIsAnimating]=useState(0);
    const carouselDyn=useRef(null);
    const carouselCenterItem=useRef(null);
    const carouselSta=useRef(null);
    const firstNormalItem = useRef();

    useEffect(()=>{
        setNextCarouselId(carouselId+1);
        setPrevCarouselId(carouselId-1);
        const parentList = carouselDyn.current;
        const parentDims = parentList?.getBoundingClientRect();
        const firstNormalDims = firstNormalItem.current?.getBoundingClientRect();
        if(carouselId==-1 && centerAlwaysItems){
            const firstNormalOffSetX = (firstNormalDims.left - parentDims.left)
            
            console.log(" to select: "+`${firstNormalOffSetX}px`)

            parentList.style.left = `${firstNormalOffSetX}px`;
        }
        if(carouselCenterItem&&arrows&&firstNormalItem.current){
            const centerStatic = carouselSta.current;
            const childCenter= carouselCenterItem.current;
            parentList.style.position = "absolute"
            parentList.style.top = "0";
            //console.log("Test of childCenter: ", carouselId,childCenter);
            if(!childCenter) {return}
            const childDims = childCenter.getBoundingClientRect();
            const centerDims = centerStatic.getBoundingClientRect();
            
            
            const centeredOnX = (childDims.left - parentDims.left);


            //console.log("testing dims: ", childDims)
            const offSetX = centeredOnX ;
            //parentList.style.transform = `translateX(-${offSetX}px)`
            parentList.style.left = `-${offSetX}px`;
        }
    },[carouselId])

    useEffect(()=>{
        //setTimeout(()=>{},3000)
        //setIsAnimating(0);
    },[isAnimating])

    function setSelectRefs(el, objId){
        carouselCenterItem.current=objId==carouselId?el:carouselCenterItem.current;
        if(firstNormalItem.current){/*console.log("first normal item ref test: ", carouselId,firstNormalItem.current);*/return};
        console.log("first normal item ref test: ", carouselId,firstNormalItem.current)
        firstNormalItem.current=objId==1?el:firstNormalItem.current;
        //console.log("refs test: ", carouselId ,carouselCenterItem.current, carouselId, firstNormalItem.current)
    }

    function handleIndChange(dir){
        console.log("Changing carousel: ", carouselId);
        setIsAnimating(dir=="next"?1:2);
        const lastInd=objList.length-(centerAlwaysItems?2:2)
        const firstInd = centerAlwaysItems?-1:0;
        setCarouselId((prev)=>{
            if(prev <= firstInd &&dir=="prev")return lastInd
            else if(prev==lastInd&&dir=="next")return firstInd
            else return dir=="next"?prev+1:prev-1;

        })
    }
    //console.log("testing objList: ", objList)
    //style={{transform: `translateX(${getTranslateX(carouselId)})`}}
    return(
    <div className={"carousel-container w-full md:flex md:justify-center"+carouselContainerClasses}>
        {arrows&&<button onClick={()=>handleIndChange("prev")} className="carousel-arrow arrow-prev w-10 ">{"<"}</button>}
        <div ref={carouselSta} className={"carousel-list-cont md:flex md:justify-center "+carouselListContClasses} >
            <div ref={ carouselDyn} className={"carousel-list flex flex-row px-4 "+carouselListClasses}  onClick={()=>console.log("Click on testimonials section test")}>
                {objList.map((obj, i)=>{
                    return(
                        <div ref={el=>setSelectRefs(el, obj.id)} key={i}>
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