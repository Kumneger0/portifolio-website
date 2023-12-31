"use client";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import logo from "../../../public/logo.png";
import Image from "next/image";

import React, { useState } from "react";

function Navbar1() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gray-800 flex p-5 fixed w-full z-50 overflow-x-hidden top-0 left-0">
      <nav className="flex items-center flex-wrap  justify-between max-[500px]:w-11/12 w-4/5 max-w-7xl mx-auto lg:gap-10 min-w-[300px]">
        <div className="flex items-center flex-shrink-0 text-white">
          <Link
            href="/"
            className="group text-white max-[500px]:text-lg flex  items-center gap-2 text-2xl transition duration-300 font-serif">
            Kumneger
            <span className="block z-50 max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white"></span>
          </Link>
        </div>
        <div className="block lg:hidden bg-white z-50">
          <button
            onClick={toggleOpen}
            className="flex items-center px-3 py-2  text-teal-200 border-teal-400 hover:text-white bg-gray-700 rounded-md">
            {isOpen ? <MdCancel /> : <FaBars />}
          </button>
        </div>
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } w-full block flex-grow  lg:flex lg:flex-row flex-col lg:items-center lg:w-auto`}>
          <div className="text-sm lg:flex-grow flex lg:flex-row flex-col items-start justify-center">
            <button className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  max-w-[100px]">
              <Link href="#Services">Services</Link>
            </button>
            <button className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 max-w-[100px]">
              <Link href="#Projects">Projects</Link>
            </button>
            <button className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110   max-w-[100px] ">
              <Link href={`#work`}>Work</Link>
            </button>
            <button className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  max-w-[100px]">
              <Link href={`#aboutme`}>About Me</Link>
            </button>
            <button className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  max-w-[100px] ">
              <Link href="/blog">Blog</Link>
            </button>
            <button className="text-white  px-3 py-1 rounded-md text-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 max-w-[150px]">
              <Link href={`#contactme`}>Contact Me</Link>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar1;
