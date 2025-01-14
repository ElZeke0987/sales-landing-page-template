import Nav from "./Nav";
import Offers from "./Offers";
import { ImgTransNavBG } from "@/global-vars";

export default function Header(){

    return(
        <header className={"relative md:block w-full nav-hy"+(ImgTransNavBG?"nav-transp":"") + ""}>
            <div className="fixed md:relative w-full">
                {/* <Offers/> */}
                <Nav/>
            </div>
                
        </header>
    )
}