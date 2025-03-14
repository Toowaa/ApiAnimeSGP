import { Anime } from "@/interface/indes";

export default function Tierlist({ AnimeList }: { AnimeList: Anime[] }) {
    return (
        <div className="max-h-52 overflow-y-auto bg-[#F4F4F5] rounded-lg p-5">
            <div className="w-full">
                <h1 className="text-[56px] leading-[56px] font-bold text-black">Top Animes</h1>
                {AnimeList.map((anime) => (
                    <div key={anime.mal_id} className="p-2">
                        <p>{anime.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}