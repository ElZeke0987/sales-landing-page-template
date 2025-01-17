import { faqList } from "@/global-vars";
import Accordion from "../../reusable/Accordion/accordion";
import "./faq.scss";

export default function FAQ(){

    return(
        <div className="faq-section flex">
            <div className="faq-cont flex">
                <div className="faq flex">
                    <div className="faq-title-cont flex justify-center items-center w-full">
                        <h1 className="faq-title-txt">Frequently Asked Questions</h1>
                    </div>
                    <div className={"faq-carousel-cont w-full flex justify-center"}>
                        <Accordion list={faqList} propTitle={"question"} propTxt={"answer"}/>
                    </div>
                </div>
            </div>
                
                
            
        </div>
    )
}