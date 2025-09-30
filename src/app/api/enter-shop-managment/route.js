import { serialize } from 'cookie';

export async function POST(request) {
    const req = await request.json();
    console.log("Request: ", req);
    const password = req.password;
  
    if (password === process.env.DEV_PASSWORD) {
      // Set cookie httpOnly
      return new Response(JSON.stringify({ success: true }),{
        headers: {
          "Set-Cookie": serialize("dev_auth", "ok", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 día
        })
      }
      });
    }
  
    return new Response(JSON.stringify({ success: false }));
}