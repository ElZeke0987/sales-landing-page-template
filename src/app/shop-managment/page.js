

import Header from "@/app/comps/sections/Header/Header";
import { cookies } from "next/headers";
import Unlogged from "./comps/unlogged";
import Logged from "./comps/logged";
import "./comps/dev-panel/devPanel.scss"
export default async function ShopManagment(){
    const cookieStore = await cookies();
    const isAuth = await cookieStore.get('dev_auth')?.value === 'ok';
    return (
        <>
        <Header/>
        <div className="flex h-screen items-center justify-center">
            {isAuth ? <Logged/> : <Unlogged/>}
        </div>
        </>
    )

}