import { useCart } from "@/app/cartProvider"
import { useOpenNavStore } from "./openNavStore";
import { navLinks } from "../headerVars";

export default function LinksList({responsive = false}){
    const { cart }=useCart();
    const { navOpen, setNavOpen } = useOpenNavStore()
    //if(!responsive)
    return(
        <ul className={ responsive?`${navOpen?" open-nav":"  closed-nav"} md:hidden nav-toggler-list bg-gray-800 nav-transp-item nav-links-list`:`hidden md:flex space-x-4 nav-links-list`}>
            {
                navLinks.map((linkObj, i)=>{
                    return (<a href={linkObj.href} className={`text-gray-300 hover:text-white anim-${i+1} relative nav-link-item ${responsive&&'block'}`} key={i}>
                        {linkObj.text}
                        {(linkObj.itsCart||linkObj.href=="/cart")&&<div className="absolute cart-length">{cart.length}</div>}
                    </a>)
                })
            }
        </ul>
    )/*
    return(
        <div id="menu" className={(navOpen?" open-nav":"  closed-nav")+" md:hidden nav-toggler-list bg-gray-800 nav-transp-item nav-links-list"} onClick={()=>setNavOpen(false)}>
                {
                    navLinks.map((linkObj, i)=>{
                        return (<a href={linkObj.href} className={`block text-gray-300 hover:text-white anim-${i+1} relative nav-link-item`} key={i} >
                            {linkObj.text}
                            {(linkObj.itsCart||linkObj.href=="/cart")&&<div className="absolute cart-length">{cart.length}</div>}
                        </a>)
                    })
                }
        </div>
    )*/
}

