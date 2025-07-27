
"use client";

export default function EntireVisualizerItem({isAnimating, objList, carouselIdSel, Element}){
    if(!Element) return <div>Cargando elementos...</div>
    if(isAnimating==0){ 
        return (<div className={`carousel-item`}>
            <Element obj={objList[carouselIdSel]}/>
        </div>)
    }
    if(isAnimating==1){
        return <>
            <div className={`carousel-item prev-1`}>
                <Element obj={objList[carouselIdSel-1 === -1? objList.length-1 :carouselIdSel-1]}/>
            </div>
            <div className={`carousel-item next-1`}>
                <Element obj={objList[carouselIdSel]}/>
            </div>
        </>
    }
    if(isAnimating==2){
        return<>
            <div className={`carousel-item prev-2`}>
                <Element obj={objList[(carouselIdSel+1) === objList.length ? 0 :carouselIdSel+1]}/>
            </div>
            <div className={`carousel-item next-2`}>
                <Element obj={objList[carouselIdSel]}/>
            </div>
        </>
    }
    
}