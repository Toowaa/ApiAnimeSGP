"use client";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

import { Flame, Radar, Star } from "lucide-react";
import { Anime } from "@/interface/indes";
import Autoplay from "embla-carousel-autoplay";

export default function Slider({ AnimeList }: { AnimeList: Anime[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      stopOnInteraction: false,
      delay: 4000,
    }),
  ]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container max-h-[660px]">
        {AnimeList.map((anime, index) => (
          <div
            key={`${anime.mal_id}-${index}`}
            className="embla__slide relative w-full sm:w-80 md:w-96 lg:w-112 overflow-hidden rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(${anime.images.webp.large_image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70 backdrop-blur-sm"></div>

            <div className="relative flex flex-col sm:grid sm:grid-cols-5 sm:grid-rows-5 h-full">
              <div className="sm:col-span-2 sm:row-span-5 h-48 sm:h-full">
                <Link href={anime.url} className="block h-full">
                  <img
                    src={anime.images.webp.large_image_url}
                    alt={anime.title}
                    className="h-full w-full object-bottom"
                  />
                </Link>
              </div>

              <div className="p-3 sm:col-span-3 sm:row-span-5 sm:col-start-3 sm:row-start-1 text-white flex flex-col">
                <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 text-white truncate">
                  {anime.title}
                </h3>

                <div className="flex justify-between mb-2 text-xs sm:text-sm w-full">
                  <p className="flex items-center">
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

                <div className="flex-grow overflow-y-auto pr-1 max-h-32 sm:max-h-full">
                  <p className="text-xs sm:text-sm text-gray-200 line-clamp-3 sm:line-clamp-4 md:line-clamp-6 lg:line-clamp-none">
                    {anime.synopsis}
                  </p>
                </div>

                <div className="mt-2 sm:mt-3 flex justify-end">
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
