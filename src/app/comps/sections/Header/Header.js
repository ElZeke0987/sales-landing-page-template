import Nav from "./Nav";
import Offers from "./Offers";
import { ImgTransNavBG } from "@/global-vars";
 
export default function Header({extraClass, classForNav}){

    return(
        <header className={"relative md:block w-full nav-hy"+(ImgTransNavBG?"nav-transp":"") + " " + extraClass}>
            <div className="fixed md:relative w-full">
                {/* <Offers/> */}
                <Nav classForNav={classForNav}/>
            </div>
                
        </header>
    )
}