import Slider from "@/components/slider";
import { AllAnimesApi, TierlistApi } from ".";
import Tierlist from "@/components/tierlist";
import { SearchApi } from "@/components/Search";
import Cards from "@/components/items";

export default async function Home() {
  const tierlist = await TierlistApi();
  const initialPage = 1;
  const allAnimes = await AllAnimesApi(initialPage);

  return (
    <div className="pt-24 ">
      <div id="slider">
        <Slider />
      </div>

      <div id="tierlist">
        <Tierlist AnimeList={tierlist.data} />
      </div>
      <div id="cards">
        <Cards />
      </div>
      <div id="search">
        <SearchApi
          AnimeAll={allAnimes.data}
          initialPage={initialPage}
          totalPages={allAnimes.pagination.last_visible_page}
        />
      </div>
   
    </div>
  );
}
