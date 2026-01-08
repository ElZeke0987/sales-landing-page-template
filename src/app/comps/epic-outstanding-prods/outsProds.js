"use client";

import { useState } from "react";
import OutsProdsTitle from "./comps/outsProdsTitle";
import OutsProdsList from "./comps/outsProdsList";
import "./outsProds.scss";



export default function OutsProds(){
    const [products, setProducts]=useState([]);
    const [activeProd, setActiveProd]=useState(null);
    const [activeList, setActiveList]=useState(null);

    return(
        <div className="outs-prods w-full h-full">
            <OutsProdsTitle/>
            <OutsProdsList/>
            
        </div>
    )
}
