

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./comps/sections/Header/Header";
import { CartProvider } from "./cartProvider";
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "2110s Store",
  description: "",
};

export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
          <CartProvider>
            <Analytics / >
            {children}
          </CartProvider>
      </body>
    </html>
  );
}
