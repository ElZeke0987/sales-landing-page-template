"use client";

import { useState } from "react"
import "./header.scss";


export default function Nav(){
    const [openNavbar, setOpenNavbar]=useState(false);
    return (
        <div className="w-full">
            <nav className=" w-full nav-toggler-height">
                <div className="bg-gray-800 p-4  flex justify-between items-center nav-toggler wi-full nav-transp-item">
                    <a href="#" className="text-white text-lg font-bold">Mi Sitio</a>
                    <div className="hidden md:flex space-x-4">
                        <a href="#" className="text-gray-300 hover:text-white">Inicio</a>
                        <a href="#" className="text-gray-300 hover:text-white">Servicios</a>
                        <a href="#" className="text-gray-300 hover:text-white">Precios</a>
                        <a href="#" className="text-gray-300 hover:text-white">Contacto</a>
                    </div>
                    <div className="md:hidden">
                        <button id="menu-toggle" className="text-white focus:outline-none" onClick={()=>setOpenNavbar(!openNavbar)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="menu" className={openNavbar?"md:hidden nav-toggler-list bg-gray-800":"hidden nav-transp-item"+" "}>
                    <a href="#" className="block text-gray-300 hover:text-white">Inicio</a>
                    <a href="#" className="block text-gray-300 hover:text-white">Servicios</a>
                    <a href="#" className="block text-gray-300 hover:text-white">Precios</a>
                    <a href="#" className="block text-gray-300 hover:text-white">Contacto</a>
                </div>
            </nav>
        </div>
    )
}