"use client";

import { useState } from "react"
const styless = {
    "nav-toggler-height": "nav-toggler-height-2",
    "nav-toggler": "nav-toggler-2",
    "wi-full": "wi-full-2",
    "nav-transp-item": "nav-transp-item-2",
    "nav-logo": "nav-logo-2",
}
import styles from "./Nav.module.scss";
import { titlesObj } from "@/global-vars";
import { useCart } from "@/app/cartProvider";
import LinksList from "./comps/LinksList";
import ResponsiveButton from "./comps/ResponsiveButton";


export default function Nav({classForNav}){
    const [openNavbar, setOpenNavbar]=useState(false);
    const { cart }=useCart()
    return (
        <div className="w-full">
            <nav className={" w-full"+ styles["nav-toggler-height"]}>
                <div className={"p-4  flex justify-between items-center " + styles["nav-toggler"] + " " + styles["wi-full"] + " " + styles["nav-transp-item"] + " " + classForNav}>
                    <a href="#" className={"text-white text-lg font-bold " + styles["nav-logo"]}>{titlesObj.logoTitle}</a>
                    <LinksList responsive={false}/>
                    <ResponsiveButton/>
                </div>
                <LinksList responsive={true}/>
            </nav>
        </div>
    )
    
    /*
    return (
        <div className="w-full">
            <nav className=" w-full nav-toggler-height">
                <div className="p-4  flex justify-between items-center nav-toggler wi-full nav-transp-item">
                    <a href="#" className="text-white text-lg font-bold nav-logo">{titlesObj.logoTitle}</a>
                    <ul className="hidden md:flex space-x-4 nav-links-list">

                        {
                            navLinks.map((linkObj, i)=>{
                                return (<a href={linkObj.href} className={`text-gray-300 hover:text-white anim-${i+1} relative nav-link-item`} key={i}>
                                    {linkObj.text}
                                    {(linkObj.itsCart||linkObj.href=="/cart")&&<div className="absolute cart-length">{cart.length}</div>}
                                </a>)
                            })
                        }
                    </ul>
                    <div className="md:hidden">
                        <button id="menu-toggle" className="text-white focus:outline-none" onClick={()=>setOpenNavbar(!openNavbar)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="menu" className={(openNavbar?" open-nav":"  closed-nav")+" md:hidden nav-toggler-list bg-gray-800 nav-transp-item nav-links-list"} onClick={()=>setOpenNavbar(false)}>
                        {
                            navLinks.map((linkObj, i)=>{
                                return (<a href={linkObj.href} className={`block text-gray-300 hover:text-white anim-${i+1} relative nav-link-item`} key={i} >
                                    {linkObj.text}
                                    {(linkObj.itsCart||linkObj.href=="/cart")&&<div className="absolute cart-length">{cart.length}</div>}
                                </a>)
                            })
                        }
                </div>
            </nav>
        </div>
    )*/
}