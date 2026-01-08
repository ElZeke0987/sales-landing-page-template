import { buyBenefits } from "@/global-vars";


export default function BuyBenefits(){

    return(
        <div className="benefit-list">
            {
                buyBenefits.map((benefit,i)=>{
                    return(
                        <div key={i} className="benefit-item flex justify-start items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="benefit-icon flex items-center h-full">
                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                            </svg>
                            
                            <div className="benefit-title h-full">{benefit.title}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}