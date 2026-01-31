import { serialize } from 'cookie';
import { supabaseAdmin } from '@/server/supabaseAdmin.config';


export async function POST(request: Request) {
    const body = await request.json();

    const password = body.password;
    const email = body.email;

    console.log("Request: ", body.password, " - dev password: ", process.env.SHOP_MANAGMENT_PASSWORD);
    //if (password === process.env.SHOP_MANAGMENT_PASSWORD && email === process.env.ADMIN_EMAIL) {
      console.log("Enviando signIn: ", email, " ", password);
        const { data: tokenData } = await supabaseAdmin.auth.signInWithPassword({
          email: email,
          password: password
        });
      console.log("OTHER TEST OF DATA USER: ", tokenData.session?.access_token)
      // Set cookie httpOnly
      if(!tokenData||!tokenData.session||!tokenData.user)return new Response(JSON.stringify({ success: false }));
      return new Response(JSON.stringify({ success: true, userData: process.env.NODE_ENV == "development" ? tokenData : null }),{
        headers: {
          "Set-Cookie": serialize("dev_auth", JSON.stringify({success: "ok", token: tokenData.session?.access_token}), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 // 1 hora
            })
        }
      });
    //}
    
    return new Response(JSON.stringify({ success: false }));
}