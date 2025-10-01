import { serialize } from 'cookie';

export async function POST(request) {
    const req = await request.json();

    const password = req.password;
    console.log("Request: ", req.password, " - dev password: ", process.env.SHOP_MANAGMENT_PASSWORD);
    if (password === process.env.SHOP_MANAGMENT_PASSWORD) {
        
      // Set cookie httpOnly
      return new Response(JSON.stringify({ success: true }),{
        headers: {
          "Set-Cookie": serialize("dev_auth", "ok", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24 // 1 día
            })
        }
      });
    }
    
    return new Response(JSON.stringify({ success: false }));
}