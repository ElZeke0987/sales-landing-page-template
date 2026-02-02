import Filters from "./filter/filters";
import Results from "./results/results";
import "./eSearch.scss";

export default function ESearch(){
    return(
        <section className="w-full min-h-screen flex justify-center esearch-outter-cont">
            <div className="esearch-inner-cont w-full flex md:flex-row flex-col items-center justify-start">
                <Filters/>
                <Results/>
            </div>
            
        </section>
    )
}