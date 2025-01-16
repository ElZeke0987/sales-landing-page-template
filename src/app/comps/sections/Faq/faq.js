import { faqList } from "@/global-vars";
import Accordion from "../../reusable/Accordion/accordion";
import "./faq.scss";

export default function FAQ(){

    return(
        <div className="">
            <div className="faq-title-cont flex justify-center items-center w-full">
                <h1 className="faq-title-txt">Frequently Asked Questions (FAQ)</h1>
            </div>
            <div className={"faq-carousel-cont w-full flex justify-center"}>
                <Accordion list={faqList} propTitle={"question"} propTxt={"answer"}/>
            </div>
            
        </div>
    )
}