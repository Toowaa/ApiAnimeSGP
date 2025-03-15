"use client";
import { Anime } from "@/interface/indes";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Anime[]>([]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.data); // Asume que la API devuelve un objeto con un campo 'data'
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="w-full sticky top-0 z-50 flex items-center justify-center">
        <div className="rounded-full bg-[hsla(0,0%,93%,0.72)] backdrop-blur-xl absolute left-1/2 top-6 z-10 -translate-x-1/2 flex items-center gap-x-8 px-6 py-2">
          <svg
            width="64"
            height="30"
            viewBox="0 0 128 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M128 28H96V60H128V28Z" fill="black" />
            <path
              d="M0 59.9998V31.8268L31.8268 0H59.9998V28.1731L28.1731 59.9998H0Z"
              fill="black"
            />
            <path
              d="M48 59.9998V31.8268L79.8268 0H108V28.1731L76.1731 59.9998H48Z"
              fill="black"
            />
          </svg>
          <div className="relative w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="w-full rounded-full bg-gray-100 pl-10 pr-4 py-2 text-gray-700 border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <ul className="flex items-center space-x-4">
            <li>
              <a href="#slider" className="text-gray-700 hover:text-gray-900">
                Slider
              </a>
            </li>
            <li>
              <a href="#tierlist" className="text-gray-700 hover:text-gray-900">
                Tierlist
              </a>
            </li>
            <li>
              <a href="#search" className="text-gray-700 hover:text-gray-900">
                Search
              </a>
            </li>
            <li className="flex items-center">
              <button className="bg-black rounded-full text-white hover:bg-gray-900 px-6 py-3">
                <a
                  href="https://github.com/Toowaa"
                  className="text-white hover:text-gray-300"
                >
                  Portafolio
                </a>
              </button>
            </li>
          </ul>
        </div>
      </div>
      {searchResults && searchTerm.trim() !== "" && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl">
          <div className="bg-[hsla(0,0%,93%,1)] shadow-lg rounded-lg overflow-y-auto max-h-[450px] p-4 mx-4">
            <h2 className="text-xl text-letter-title font-bold mb-4">
              Resultados de búsqueda:
            </h2>
            {searchResults.length > 0 ? (
              <ul className="text-base-letter">
                {searchResults.map((anime) => (
                  <li key={anime.mal_id} className="mb-2">
                    <a
                      href={anime.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded"
                    >
                      <Image
                        src={anime.images.webp.image_url}
                        alt={anime.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <span>{anime.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-black">No se encontraron resultados</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
