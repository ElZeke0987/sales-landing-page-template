"use client"

import Header from "@/app/comps/sections/Header/Header";
import { useEffect, useState } from "react";
import Unlogged from "./comps/unlogged";
import Logged from "./comps/logged";
export default function ShopManagment(){
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState(false);

    async function checkAdmin(){
        const check = fetch("/api/check-admin", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const response = await check;
        const data = await response.json();
        setLogged(data.authenticated);
    }

    async function submitPasswordToEnter(){
        const enterPassword = fetch("/api/enter-shop-managment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password })
        });
        const response = await enterPassword;
        const data = await response.json();
        if(password === "" && password==undefined) return false;
        
        setLogged(data.success&&process.env.NODE_ENV=="development");
    }
    return (
        <>
        <Header/>
        <div className="flex h-screen items-center justify-center">
            {logged ? <Logged/> : <Unlogged setPassword={setPassword}/>}
        </div>
        </>
    )

}