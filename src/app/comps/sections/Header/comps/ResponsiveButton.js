import { useOpenNavStore } from "./openNavStore";

function ResponsiveButton() {

    const {navOpen, setNavOpen}=useOpenNavStore()
    return ( 
        <div className="md:hidden">
            <button id="menu-toggle" className="text-white focus:outline-none" onClick={()=>setNavOpen(!navOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div> 
    );
}

export default ResponsiveButton;