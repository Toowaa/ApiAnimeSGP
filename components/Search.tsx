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

  return (
    <div>
        <h1 className="text-center text-4xl font-bold text-black">Buscar Anime</h1>
    <div className="container mx-auto bg-amber-100 rounded-4xl p-5">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {animes.map((anime) => (
          <div key={anime.mal_id} className="bg-[#F3F3F3] rounded-4xl p-4">
            <img
              src={anime.images.webp.image_url}
              alt={anime.title}
              className="w-full h-48 object-cover rounded-xl"
            />
            <p className="text-lg font-medium mt-2 text-black">{anime.title}</p>
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