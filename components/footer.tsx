"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import RedesSociales from "./RedesSociales";

export default function Footer() {
  const leftLinks = [
    { text: "Api WebSite", href: "https://jikan.moe/#features" },
    { text: "GitHub", href: "https://github.com/Toowaa" },
    { text: "LinkedLn", href: "https://www.linkedin.com/in/brahanbonilla/" },
    { text: "Contact to Me", href: "mailto:brahanbonilla@gmail.com" },
  ];


  return (
    <footer className="bg-[black] text-white rounded-none  lg:rounded-t-full">
      <div className="lg:max-w-7xl lg:mx-auto lg:px-4 py-16 mx-10 ml-16">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex-shrink-0"
          >
            <svg
              width="248"
              height="60"
              viewBox="0 0 128 60"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M128 28H96V60H128V28Z" fill="white" />
              <path
                d="M0 59.9998V31.8268L31.8268 0H59.9998V28.1731L28.1731 59.9998H0Z"
                fill="white"
              />
              <path
                d="M48 59.9998V31.8268L79.8268 0H108V28.1731L76.1731 59.9998H48Z"
                fill="white"
              />
            </svg>
          </motion.div>

          <div className="flex flex-col text-start w-full md:w-auto">
            <h3 className="text-xl font-semibold mb-5">Enlaces</h3>
            <div className="grid grid-cols-2 lg:gap-20">
              <ul className="space-y-3">
                {leftLinks.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className="text-purple-100 hover:text-white transition-colors duration-500 text-sm flex items-center group relative"
                    >
                      <span className="relative group">
                        {link.text}
                        <span className="absolute bottom-0 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full inline-block duration-500"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

             
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="flex flex-col text-start w-full md:w-auto">
              <h3 className="text-xl font-semibold text-white mb-4">
               Sigueme
              </h3>
              <div className="flex justify-start space-x-6">
                <RedesSociales />
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
