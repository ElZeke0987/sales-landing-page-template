import { serialize } from "cookie";

export async function POST() {
  const cookie = serialize("dev_auth", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Set-Cookie": cookie },
  });
}