"use client";
import { Anime } from "@/interface/indes";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  
  // Referencias para controlar las peticiones
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const requestQueue = useRef<Array<() => Promise<void>>>([]);
  const isProcessingQueue = useRef<boolean>(false);
  const lastRequestTime = useRef<number>(0);
  
  // Cache para búsquedas recientes
  const searchCache = useRef<Record<string, Anime[]>>({});

  // Procesar cola de peticiones respetando el rate limit
  const processQueue = async () => {
    if (isProcessingQueue.current || requestQueue.current.length === 0) return;
    
    isProcessingQueue.current = true;
    
    while (requestQueue.current.length > 0) {
      const now = Date.now();
      const timeElapsed = now - lastRequestTime.current;
      
      // Asegurar al menos 350ms entre peticiones (3 por segundo como máximo)
      if (lastRequestTime.current > 0 && timeElapsed < 350) {
        await new Promise(resolve => setTimeout(resolve, 350 - timeElapsed));
      }
      
      // Ejecutar la siguiente petición en la cola
      const nextRequest = requestQueue.current.shift();
      if (nextRequest) {
        lastRequestTime.current = Date.now();
        await nextRequest();
      }
    }
    
    isProcessingQueue.current = false;
  };

  // Manejar el cambio en el término de búsqueda con debounce
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Debounce para evitar peticiones en cada pulsación
    debounceTimeout.current = setTimeout(() => {
      // Si hay resultados en cache, usarlos
      if (searchCache.current[searchTerm]) {
        setSearchResults(searchCache.current[searchTerm]);
        return;
      }
      
      // Añadir petición a la cola
      enqueueSearch();
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchTerm]);

  // Añadir búsqueda a la cola
  const enqueueSearch = () => {
    const searchRequest = async () => {
      setIsLoading(true);
      setIsRateLimited(false);
      
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=10`
        );
        
        if (response.status === 429) {
          // Código 429 = Too Many Requests
          setIsRateLimited(true);
          // Reintentar después de 1 segundo
          setTimeout(() => enqueueSearch(), 1000);
          return;
        }
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        // Guardar en cache
        searchCache.current[searchTerm] = data.data;
        // Actualizar resultados solo si el término de búsqueda sigue siendo el mismo
        if (searchTerm.trim() !== "") {
          setSearchResults(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Añadir la función a la cola y procesarla
    requestQueue.current.push(searchRequest);
    processQueue();
  };

  // Función para búsqueda manual (botón o Enter)
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    
    if (searchCache.current[searchTerm]) {
      setSearchResults(searchCache.current[searchTerm]);
      return;
    }
    
    enqueueSearch();
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
              className="w-full rounded-full bg-gray-100 pl-10 pr-10 py-2 text-gray-700 border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSearchResults([]);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
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
              <a href="#cards" className="text-gray-700 hover:text-gray-900">
                Más
              </a>
            </li>
            <li>
              <a href="#search" className="text-gray-700 hover:text-gray-900">
                Pagination
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
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
              </div>
            ) : isRateLimited ? (
              <div className="text-center py-4">
                <p className="text-black mb-2">Demasiadas peticiones a la API</p>
                <p className="text-gray-600 text-sm">Reintentando automáticamente...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <ul className="text-base-letter">
                {searchResults.map((anime) => (
                  <li key={anime.mal_id} className="mb-2">
                    <a
                      href={anime.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded"
                    >
                      <img
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