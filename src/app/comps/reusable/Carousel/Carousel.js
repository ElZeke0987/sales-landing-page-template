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

export default function Carousel({objList, Element, arrows=true , objOpt, setObjOpt, centerAlwaysItems=true, 
    selControls=false, lastFreezeMovItemId=3, firstFreezeMovItemId=-1,//Dos antes del final
    carouselContainerClasses, carouselListContClasses, carouselListClasses }){

    const [carouselId, setCarouselId]=useState(0);
    const [carouselIdSel, setCarouselIdSel]=useState(centerAlwaysItems?2:0);
    const [isAnimating, setIsAnimating]=useState(0);

    const carouselDyn=useRef(null);
    const carouselCenterItem=useRef(null);
    const carouselSta=useRef(null);
    const firstNormalItem = useRef();

    useEffect(()=>{
        const parentList = carouselDyn.current;
        const parentDims = parentList?.getBoundingClientRect();
        const firstNormalDims = firstNormalItem.current?.getBoundingClientRect();
        if(carouselId==-1 && centerAlwaysItems && firstNormalItem.current){
            const firstNormalOffSetX = (firstNormalDims.left - parentDims.left)
            
           // console.log(" to select: "+`${firstNormalOffSetX}px`)

            parentList.style.left = `${firstNormalOffSetX}px`;
        }
        console.log(carouselId,carouselCenterItem)
        if(carouselCenterItem&&arrows){

            

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
            const freezeLastCond=carouselId>objList.length-lastFreezeMovItemId;
            const freezeFirstCond=carouselId<firstFreezeMovItemId;
            const moveFirstToLast= carouselIdSel!=objList.length-1;
            
            //console.log("Changing carousel: ", carouselId);
            /*console.log("testing cond to freeze move: ",
                carouselId, ">" ,objList.length-lastFreezeMovItemId, (freezeLastCond), "\n",
                carouselId, "<" ,firstFreezeMovItemId,freezeFirstCond, "\n",
                carouselIdSel, "!=", objList.length-1,
                )*/
            
            if(!centerAlwaysItems&&(freezeLastCond||freezeFirstCond)&&objOpt&&setObjOpt)return
            parentList.style.left = `-${offSetX}px`;
        }
    },[carouselId])

    useEffect(()=>{
        //console.log(centerAlwaysItems?carouselIdSel-1:carouselIdSel, objList[centerAlwaysItems?carouselIdSel-1:carouselIdSel])
        if(!setObjOpt)return
        setObjOpt(objList[centerAlwaysItems?carouselIdSel-1:carouselIdSel])
    },[carouselIdSel])

    useEffect(()=>{
        //setTimeout(()=>{},3000)
        //setIsAnimating(0);
    },[isAnimating])

    function setSelectRefs(el, objId){
        carouselCenterItem.current=objId==carouselId?el:carouselCenterItem.current;
        if(firstNormalItem.current){/*console.log("first normal item ref test: ", carouselId,firstNormalItem.current);*/return};
        //console.log("first normal item ref test: ", carouselId,firstNormalItem.current)
        firstNormalItem.current=objId==1?el:firstNormalItem.current;
        //console.log("refs test: ", carouselId ,carouselCenterItem.current, carouselId, firstNormalItem.current)
    }

    function handleIndChange(dir){
        const toRestByWindowWX=window.innerWidth<1024?1:2;
        //console.log("inner: ",window.innerWidth);
        setIsAnimating(dir=="next"?1:2);
        const lastInd=objList.length-(centerAlwaysItems||(!centerAlwaysItems&&!setObjOpt)?toRestByWindowWX:1)//En el caso de que no se tenga que centrar el objeto en el carrusel, 2 slides antes sera el ultimo slide
        const firstInd = centerAlwaysItems?-1:0;//Si se centrara, dejaria un slide mas para dejar margen de vista y centramiento del primer elemento
        setCarouselId(prev=>{//Manejo eficiente de cambio de slides de un lugar a otro
            if(prev <= firstInd &&dir=="prev")return lastInd
            else if(prev==lastInd&&dir=="next")return firstInd
            else return dir=="next"?prev+1:prev-1;

        })
        if(!selControls){return}
        setCarouselIdSel(prev=>{
            const lastIndSel=centerAlwaysItems?objList.length:objList.length-1;
            const firstIndSel=centerAlwaysItems?1:0;
            if(prev==lastIndSel&&dir=="next"){
                setCarouselId(0);
                return firstIndSel
            }
            else if(prev==firstIndSel&&dir=="prev"){
                setCarouselId(objList.length-lastFreezeMovItemId)
                return lastIndSel
            }
            else return dir=="next"?prev+1:prev-1
        })
    }
    //console.log("testing objList: ", objList)
    //style={{transform: `translateX(${getTranslateX(carouselId)})`}}
    return(
    <div className={"carousel-container w-full md:flex md:justify-center "+carouselContainerClasses}>
        {arrows&&<button onClick={()=>handleIndChange("prev")} className="carousel-arrow arrow-prev w-10 ">{"<"}</button>}
        <div ref={carouselSta} className={"carousel-list-cont md:flex md:justify-center "+carouselListContClasses} >
            <div ref={ carouselDyn} className={"carousel-list flex flex-row px-4 "+carouselListClasses}  >
                {objList.map((obj, i)=>{
                    return(
                        <div ref={el=>setSelectRefs(el, obj.id)} key={i} className="carousel-item">
                            <Element obj={obj} i={i} objOpt={objOpt} setObjOpt={setObjOpt}  />
                        </div>
                    
                    )
                })}
            </div>
        </div>
        {arrows&&<button onClick={()=>handleIndChange("next")} className="carousel-arrow w-10 arrow-next ">{">"}</button>}
    </div>
    )
}