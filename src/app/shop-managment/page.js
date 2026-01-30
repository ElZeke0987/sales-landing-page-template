

import Header from "@/app/comps/sections/Header/Header";
import { cookies } from "next/headers";
import Unlogged from "./comps/unlogged";
import Logged from "./comps/logged";
import "./comps/dev-panel/devPanel.scss"
export default async function ShopManagment(){
    const cookieStore = await cookies();
    const cookieDevAuth = JSON.parse(cookieStore.get('dev_auth')?.value || '{}');

        //console.log("isAuth", cookieDevAuth);

    return (
        <>
        <Header/>
        <div className="flex h-screen items-center justify-center">
            {process.env.NODE_ENV === "development"? (cookieDevAuth?.success === "ok" ? <Logged/> : <Unlogged/> ) : "SOLO SE PUEDE VER EN DESARROLLO"}
        </div>
        </>
    )

}