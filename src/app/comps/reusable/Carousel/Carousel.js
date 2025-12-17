"use client";
import { useState, useEffect, useRef } from "react";
import "./carousel.scss";
import EntireVisualizerItem from "./entireVisualizerItem";

function getTranslateX(carouselId){
    if(window==undefined) return
    
    if(window.innerWidth<768){
        return `-${((carouselId-1) * 100)}%`
    }else{
         return `-${((carouselId-1) * 22)}vw`
    }
}

/**
 * objOpt es esencial para manejar, mas que nada desde el click sobre las miniaturas del carrusel, los objetos
 * determinar cual es el objeto que se clickeo y tomar sus datos.
 */

export default function Carousel({
    objList, //Lista iterable en el carrusel
    Element, //Elemento modelo de cada item
    arrows=true, //Si van a haber flechas de movimiento
    objOpt, setObjOpt, //Estado para afectar en cambios externos a cambios en el carrusel (de los cambios de objeto seleccionado, se plasme en la visual de carrusel)
    centerAlwaysItems=true, //Centra siempre la vista sobre el centro del objeto seleccionado
    selControls=false, //Dar control de seleccion a las flechas
    animSeconds=600,
    cooldownClickSeconds=600,
    lastFreezeMovItemId=3, firstFreezeMovItemId=-1,//Dos antes del final
    carouselContainerClasses, carouselListContClasses, carouselListClasses, 
    entireVisualizer,//Los items ocupan todo el ancho y alto del carrusel (si es true)
    onItemClick//Que hara cuando se haga click en cada item, parametros que llevara por defecto: eventObject, obj, i, objOpt, setObjOpt
    }){

    const [carouselId, setCarouselId]=useState(0);//Slide individual que se esta visualizando
    const [carouselIdSel, setCarouselIdSel]=useState(centerAlwaysItems?2:0);//Objeto en el carrousel
    const [isAnimating, setIsAnimating]=useState(0);//Estado y direccion de animacion, 1 es next, 2 es prev, 1 es right, 2 es left
    const [cooldownClick, setCooldownClick]=useState(false);

    const carouselDyn=useRef(null);
    const carouselCenterItem=useRef(null);
    const carouselSta=useRef(null);
    const firstNormalItem = useRef();

    useEffect(()=>{
        if(entireVisualizer)return
        /**
         *Efecto para mover el slider sobre el visualizer en cada cambio de slide individual
         *Si es un entireVisualizer (ocupa toda la vision, usa otra mecanica digamos) esto no se tiene en cuenta  
         */
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

            
            /* */
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
        console.log("Efecto carouselIdSel, seleccionando este objOpt: id: ",centerAlwaysItems?carouselIdSel-1:carouselIdSel, "\nobjeto u opcion correspondient: ",objList[centerAlwaysItems?carouselIdSel-1:carouselIdSel])
        if(setObjOpt) setObjOpt(objList[centerAlwaysItems?carouselIdSel-1:carouselIdSel])//Sistema de seleccion de objetos / imagenes segun su ID
    },[carouselIdSel])

    useEffect(()=>{
        setTimeout(()=>{setIsAnimating(0)},cooldownClickSeconds)
        
    },[isAnimating])

    function setSelectRefs(el, objId){//Organiza refs que seran usados al momento de calcular movimientos y coordenadas
        carouselCenterItem.current=objId==carouselId?el:carouselCenterItem.current;
        if(firstNormalItem.current){return};
        firstNormalItem.current=objId==1?el:firstNormalItem.current;
    }
    
    function handleIndChange(dir){
        
        if(cooldownClick)return
        const toRestByWindowWX=window.innerWidth<1024?1:2;
        setIsAnimating(dir=="next"?1:2);//Estado para decidir la direccion de la animacion
        const lastInd=objList.length-(centerAlwaysItems||(!centerAlwaysItems&&!setObjOpt)?toRestByWindowWX:1)//En el caso de que no se tenga que centrar el objeto en el carrusel, 2 slides antes sera el ultimo slide
        const firstInd = centerAlwaysItems?-1:0;//Si se centrara, dejaria un slide mas para dejar margen de vista y centramiento del primer elemento
        setCarouselId(prev=>{//Manejo eficiente de cambio de slides de un lugar a otro
            if(prev <= firstInd &&dir=="prev")return lastInd
            else if(prev==lastInd&&dir=="next")return firstInd
            else return dir=="next"?prev+1:prev-1;

        })
        if(!selControls&&!entireVisualizer){return}//Control de flechas sobre la seleccion, 
                                                   //si se usa el visualizador entero, obligatoriamente se podra controlar mediante las flechas
        
        setCarouselIdSel(prev=>{//Lo mismo que el setter anterior, pero para el objeto en el carrusel
            
            const lastIndSel=centerAlwaysItems&&!entireVisualizer?objList.length:objList.length-1;
            const firstIndSel=centerAlwaysItems&&!entireVisualizer?1:0;
            /**
             * El ultimo y primer indice, seran en numeros contables normales si se tienen que centrar elementos seleccionados
             * y no se debe ocupar entero el espacio del visualizador
             * En el caso contrario a todo eso, se usaran indices normales de computadora 
             */
            
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
        if(!cooldownClick){
            setCooldownClick(true)
            setTimeout(()=>setCooldownClick(false), cooldownClickSeconds)
            return
        }
    }
    return(
    <div className={"carousel-container w-full md:flex md:justify-center "+carouselContainerClasses}>
        {arrows&&
        <div className="flex items-center h-full arrow-cont">
            <button onClick={()=>handleIndChange("prev")} className="carousel-arrow arrow-prev w-10 ">{"<"}</button>
        </div>
        
        }
        <div ref={carouselSta} className={"carousel-list-cont md:flex md:justify-center "+carouselListContClasses} >
            <div ref={ carouselDyn} className={"carousel-list flex flex-row px-4 "+carouselListClasses}  >
                {entireVisualizer?<EntireVisualizerItem isAnimating={isAnimating} carouselIdSel={carouselIdSel} objList={objList} Element={Element}/>:
                    objList.map((obj, i)=>{
                        return(
                            <div ref={el=>setSelectRefs(el, obj.id)} key={i} className="carousel-item">
                                <Element obj={obj} i={i} objOpt={objOpt} setObjOpt={setObjOpt} onClick={(e)=>{if(onItemClick) onItemClick(e, obj, i, objOpt, setObjOpt, carouselIdSel,setCarouselIdSel)}}/>
                            </div>
                        
                        )
                    })
                }
            </div>
        </div>
        {arrows&&
        <div className="flex items-center h-full arrow-cont">
            <button onClick={()=>handleIndChange("next")} className="carousel-arrow w-10 arrow-next ">{">"}</button>
        </div>
        }
    </div>
    )
}