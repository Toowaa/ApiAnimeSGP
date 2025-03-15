"use client";
import { Anime } from "@/interface/indes";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Tierlist({ AnimeList }: { AnimeList: Anime[] }) {
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  const handleAnimeClick = (anime: Anime) => {
    setSelectedAnime(anime);
  };
  const text = "Lo Mejor de esta Temporada";

  return (
    <>
    <div className="my-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center lg:mb-12"
      >
        <h2 className="lg:text-4xl font-title-1 font-bold text-title mb-5 text-2xl text-[#634AE2]">
          ¿Sin nada más, ¿qué esperas?
        </h2>
        <p className="lg:text-title font-title-1  text-base mb-5 lg:w-[643px] w-[400px] mx-auto font-light leading-relaxed text-[#634AE2]">
          Te ofrecemos una selección de anime de la temporada de 2023, disfruta
          de una gran variedad de géneros y estilos de anime. ¡No te pierdas
          ninguna oportunidad de diversificar tus intereses!
        </p>
      </motion.div>
      </div>
    <div className="my-20"> <strong className="font-title-2  text-5xl my-5 text-center block mx-auto text-gray-800">
    <motion.h1 className="text-title font-title-1 text-[#634AE2] font-bold ">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.09}} 
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
    
  </strong>
  
    <div className="bg-[#F3F3F3] mx-auto  p-6 rounded-4xl max-w-7xl">
        
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-5 bg-white items-center rounded-4xl text-center max-h-[550px] overflow-hidden">
          <h1 className="text-5xl  font-title-2 font-bold leading-loose text-[#634AE2] mx-auto sticky top-0 py-2decoration-2  ">
            Top Animes
          </h1>
          <div className="overflow-y-auto max-h-[450px] text-[#634AE2]">
            {AnimeList.map((anime) => (
              <div
                key={anime.mal_id}
                className={`p-2 cursor-pointer hover:bg-gray-200 transition-colors ${
                  selectedAnime?.mal_id === anime.mal_id ? "bg-gray-100" : ""
                }`}
                onClick={() => handleAnimeClick(anime)}
              >
                <p className="text-lg font-medium">{anime.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3 row-span-4 col-start-3 bg-[#F9627D] flex items-center justify-center">
          {selectedAnime?.trailer?.youtube_id ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedAnime.trailer.youtube_id}`}
              title={`${selectedAnime.title} trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="text-white  text-center p-4">
              <p className="text-xl">Selecciona un anime para ver su trailer</p>
              {selectedAnime && !selectedAnime.trailer?.youtube_id && (
                <p className="mt-2">
                  No hay trailer disponible para este anime
                </p>
              )}
            </div>
          )}
        </div>

        <div className="col-span-3 col-start-3 row-start-5 bg-white p-4 rounded-4xl">
          {selectedAnime ? (
            <div>
              <h2 className="text-xl font-semibold  text-black mb-2">Géneros:</h2>
              <div className="flex flex-wrap gap-2 ">
                {selectedAnime.genres && selectedAnime.genres.length > 0 ? (
                  selectedAnime.genres.map((genre) => (
                    <span
                      key={genre.mal_id}
                      className="px-3 py-1 bg-[#F9627D] text-white rounded-full text-sm"
                    >
                      <div>{genre.name} </div>
                    </span>
                  ))
                ) : (
                  <p className="text-[white]">No hay géneros disponibles</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-white text-center">
              Selecciona un anime para ver sus géneros
            </p>
          )}
        </div>
      </div>
    </div>
    </div> 
    </>
  );
}
