"use client";
import { Anime } from "@/interface/indes";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Flame, Radar, Star } from "lucide-react";
import Link from "next/link";

export default function Newslider({ AnimeList }: { AnimeList: Anime[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      stopOnInteraction: false,
      delay: 4000,
    }),
  ]);

  return (
    <div className="embla" ref={emblaRef}>
    <div className="embla__container max-h-[660px]">
      {AnimeList.map((anime) => (
        <div
          key={anime.mal_id}
          className="embla__slide rounded-lg shadow-lg w-full
           grid grid-cols-1 md:grid-cols-4 md:grid-rows-5 gap-4
         "
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${anime.images.webp.large_image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backdropFilter: "blur(60px)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70 backdrop-blur-sm z-0"></div>
  
          {/* Imagen */}
          <div className="relative z-10 row-span-5 md:row-span-5">
            <Link href={anime.url}>
              <img
                src={anime.images.webp.large_image_url}
                alt={anime.title}
                className="h-full w-full rounded-lg object-bottom"
              />
            </Link>
          </div>
  
          {/* Texto */}
          <div className="relative z-10 col-span-3 row-span-3 col-start-2 row-start-3 md:col-span-3 md:row-span-3 md:col-start-2 md:row-start-3">
            <h3 className="text-xl font-bold text-white mb-2">
              {anime.title}
            </h3>
            <button className="flex items-center rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm text-white bg-black/50 backdrop-blur-sm">
              <span
                className={`inline-block w-2 h-2 rounded-full mr-1 sm:mr-2 ${
                  anime.status === "Currently Airing"
                    ? "bg-green-500"
                    : anime.status === "Not yet aired"
                    ? "bg-gray-500"
                    : "bg-blue-500"
                }`}
              ></span>
              {anime.status}
            </button>
            <p className="text-white my-5 max-h-48 md:h-full md:overflow-hidden overflow-auto p-4 mx-auto w-auto">
              {anime.synopsis}
            </p>
  
            <div className="flex space-x-4 text-xs sm:text-sm w-full">
              <p className="flex ">
                <Radar
                  color="#F85222"
                  fill="#FFD700"
                  className="mr-1 h-3 w-3 sm:h-4 sm:w-4"
                />
                <span className="text-white">Rank: {anime.rank}</span>
              </p>
              <p className="flex items-center">
                <Flame
                  color="#F85222"
                  fill="#FFD700"
                  className="mr-1 h-3 w-3 sm:h-4 sm:w-4"
                />
                <span className="text-white">Pop: {anime.popularity}</span>
              </p>
              <p className="flex items-center">
                <Star
                  color="#FFD700"
                  fill="#FFD700"
                  className="mr-1 h-3 w-3 sm:h-4 sm:w-4"
                />
                <span className="text-white">Favs: {anime.favorites}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}
