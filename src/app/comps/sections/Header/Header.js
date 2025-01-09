import Nav from "./Nav";
import Offers from "./Offers";


export default function Header(){
    return(
        <header className="relative md:block w-full">
            <div className="fixed md:relative w-full">
                <Offers/>
                <Nav/>
            </div>
                
        </header>
    )
}