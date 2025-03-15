"use client";

import { Anime } from "@/interface/indes";
import { useState } from "react";
import { Pagination } from "./pagination";

export const SearchApi = ({
  AnimeAll,
  initialPage,
  totalPages,
}: {
  AnimeAll: Anime[];
  initialPage: number;
  totalPages: number;
}) => {
  const [animes, setAnimes] = useState<Anime[]>(AnimeAll);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleSynopsis, setVisibleSynopsis] = useState<number | null>(null);

  const loadPage = async (pageNumber: number) => {
    if (isLoading || pageNumber < 1 || pageNumber > totalPages) return;

    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/anime?page=${pageNumber}`
    );
    const data = await res.json();

    setAnimes(data.data);
    setPage(pageNumber);
    setIsLoading(false);
  };

  const handleClick = (mal_id: number) => {
    setVisibleSynopsis(visibleSynopsis === mal_id ? null : mal_id);
  };

  return (
    <div className="my-20">
      <h1 className="text-center text-4xl my-5 font-bold text-letter-title">
        Buscar Anime
      </h1>
      <div className="container mx-auto bg-[#F3F3F3] rounded-4xl p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {animes.map((anime) => (
            <div
              key={anime.mal_id}
              className="bg-[#fffefe] rounded-4xl p-4 cursor-pointer relative overflow-hidden"
              onClick={() => handleClick(anime.mal_id)}
            >
              <img
                src={anime.images.webp.image_url}
                alt={anime.title}
                className="w-full h-48 object-cover rounded-xl"
              />
              <p className="text-lg font-light  mt-2 text-black">
                {anime.title}
                <span className="absolute bottom-0 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full inline-block duration-500"></span>
              </p>

              <div
                className={`absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 transition-transform duration-300 ease-in-out max-h-64 overflow-y-auto ${
                  visibleSynopsis === anime.mal_id
                    ? "translate-y-0"
                    : "translate-y-full"
                }`}
              >
                <p className="text-sm text-gray-600">{anime.synopsis}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={loadPage}
          />
        </div>
      </div>
    </div>
  );
};
