
import { Icons } from "@/icons";
import React from "react";

const redes = [
  {
    nombre: "tiktok",
    icono: Icons.tiktok,
    link: "https://www.tiktok.com/",
  },
  {
    nombre: "threads",
    icono: Icons.threads,
    link: "https://www.threads.net/",
  },
  {
    nombre: "instagram",
    icono: Icons.instagram,
    link: "https://www.instagram.com/brahanalexander/",
  },
  {
    nombre: "facebook",
    icono: Icons.facebook,
    link: "https://www.facebook.com/",
  },
  {
    nombre: "youtube",
    icono: Icons.youtube,
    link: "https://www.youtube.com/@brahanalexander9428",
  },
  
];

const RedesSociales = () => {
  return (
    <div>
      <ul className="wrapper  ">
        {redes.map((rede, index) => (
          <li
          className={`icon ${rede.nombre} w-5 fill-current text-[#636363]`}
            key={index}
            onClick={() => window.open(rede.link, "_blank")}
          >
            <span className="tooltip capitalize">{rede.nombre}</span>
            <div
              className="icon-svg"
              dangerouslySetInnerHTML={{ __html: rede.icono }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RedesSociales;
