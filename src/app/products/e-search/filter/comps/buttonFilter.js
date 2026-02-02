import { create } from "zustand"
import "./styles/buttonFilter.scss";

export const useOpenFilter= create(set=>({
    innerOpenState: false,
    openState: false,
    setOpenState: (signal, closeTime=600)=>{
        set(state=>({...state,innerOpenState: signal}));
        if(signal==false){
            console.log("Changing signal to false")
            setTimeout(()=>set(state=>({...state,openState: signal})), closeTime)
        }
        else set(state=>({...state,openState: signal}))
    },
}))

function handleOpenFilterMenu(){
    
}

export default function FilterButton(){
    const {openState, setOpenState}=useOpenFilter();
    return(
        <div className="flex w-full justify-center filter-button-container">
            <div className={`filter-button flex ${openState&&"radius-button"}`} onClick={()=> setOpenState(!openState)}>
                <div>
                    <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <title>Filter</title> 
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> 
                                <g id="Filter"> 
                                    <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24" height="24"> </rect> 
                                    <line x1="4" y1="5" x2="16" y2="5" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"> </line> 
                                    <line x1="4" y1="12" x2="10" y2="12" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"> </line> 
                                    <line x1="14" y1="12" x2="20" y2="12" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"> </line> 
                                    <line x1="8" y1="19" x2="20" y2="19" id="Path" stroke="#0C0310" strokeWidth="2" strokeLinecap="round"> </line> 
                                    <circle id="Oval" stroke="#0C0310" strokeWidth="2" strokeLinecap="round" cx="18" cy="5" r="2"> </circle> 
                                    <circle id="Oval" stroke="#0C0310" strokeWidth="2" strokeLinecap="round" cx="12" cy="12" r="2"> </circle> 
                                    <circle id="Oval" stroke="#0C0310" strokeWidth="2" strokeLinecap="round" cx="6" cy="19" r="2"> </circle> 
                                </g> 
                            </g> 
                        </g>
                    </svg>
                </div>
                <button  className="button-filter-txt">Categorias<span></span></button>
            </div>
        </div>
        
    )
}