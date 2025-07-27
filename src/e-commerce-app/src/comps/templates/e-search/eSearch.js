import Filters from "./filter/filters";
import Results from "./results/results";
import "./eSearch.scss";

export default function ESearch(){
    return(
        <section className="w-full h-full flex justify-center esearch-outter-cont">
            <div className="esearch-inner-cont w-full flex flex-col items-center">
                <Filters/>
                <Results/>
            </div>
            
        </section>
    )
}