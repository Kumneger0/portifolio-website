import React from "react";
import "./../../globals.css";
import NextAuthWrapper from "@/components/nextAuthWrapper";
import BlogHeader from "@/components/blogHeader/blogHeader";
import {Open_Sans} from 'next/font/google'

const openSans = Open_Sans({
   subsets: ['latin'],
  display: 'swap',
})

function Bloglayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={openSans.className}>
      <body>
        <NextAuthWrapper>
          <div className="dark min-h-screen  bg-gray-800 text-white">
            <main className=" mx-auto  px-4 max-w-5xl py-12 md:px-6 lg:px-8">
              <BlogHeader />
              {children}
            </main>
          </div>
        </NextAuthWrapper>
      </body>
    </html>
  );
}

export default Bloglayout;
