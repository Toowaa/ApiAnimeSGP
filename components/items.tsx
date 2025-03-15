"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";



export default function Cards() {
  


  const services = [
    {
      id: "/Magazines",
      title: "Magazines",
    },
    {
      id: "/Mangas",
      title: "Mangas",
    },
    {
      id: "/people",
      title: "people",
    },
    {
      id: "/produces",
      title: "producers",
    },
    {
      id: "/reviews",
      title: "reviews",
    },
  ];

 

  return (
    <div className="max-w-full px-0 mb-4 mx-auto lg:py-16 ">
      <motion.h2
        className="lg:text-4xl text-letter-title text-2xl font-bold mt-[65px] text-center text-title lg:mb-16 mb-7"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Ver mas detalles
      </motion.h2>

      <div className="lg:block hidden">
        <div className=" flex gap-[3px] md:flex-row flex-col">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex-1 bg-[#F3F3F3] p-3 text-base-letter duration-400 flex flex-col
            hover:flex-[1.2] hover:shadow-[0_7px_29px_0px_rgba(99,74,226,0.2)]
            md:w-auto w-full md:hover:flex-[1.2]"
            >
              <h3 className="mt-3 mb-[46px] text-xl font-bold">
                {service.title}
              </h3>
              <div className="flex flex-col items-end mt-auto mb-5">
                <button
             
                  className="group flex items-center space-x-2 text-sm hover:text-purple-200 transition-colors"
                >
                  <span className="relative group">
                    Ver más
                    <span className="absolute bottom-0 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full duration-500"></span>
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* solo se muestra en tamaños pequeños */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-2 gap-1 m-3 ">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-[#F3F3F3] p-3 text-base-letter duration-400 flex flex-col rounded-2xl
              hover:shadow-[0_7px_29px_0px_rgba(99,74,226,0.2)]
              ${
                services.length % 2 !== 0 && index === services.length - 1
                  ? "col-span-2"
                  : ""
              }`}
            >
              <h3 className="mt-3 mb-4 text-xl font-bold">{service.title}</h3>
              <div className="flex flex-col items-end mt-auto mb-5">
                <button
            
                  className="group flex items-center space-x-2 text-sm hover:text-purple-200 transition-colors"
                >
                  <span className="relative group">
                    Ver más
                    <span className="absolute bottom-0 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full duration-500"></span>
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}