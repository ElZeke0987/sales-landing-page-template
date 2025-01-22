

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./comps/sections/Header/Header";
import { CartProvider } from "./cartProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Product Template Landing Page",
  description: "Created By Sebastian S.",
};


export default function RootLayout({ children }) {


  return (
    <CartProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> {children}</body>
      </html>
    </CartProvider>
  );
}
