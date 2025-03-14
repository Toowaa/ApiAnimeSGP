

import Slider from "@/components/slider";
import { AllAnimesApi, fetchData, TierlistApi } from ".";
import Tierlist from "@/components/tierlist";
import { SearchApi } from "@/components/Search";


export default async function Home() {

  const tierlist = await TierlistApi();
  const initialPage = 1;
  const allAnimes = await AllAnimesApi(initialPage);

  return (
    <div className="pt-24 h-screen">
      {/* Slider con id "slider" */}
      <div id="slider">
        <Slider />
      </div>

      {/* Tierlist con id "tierlist" */}
      <div id="tierlist">
        <Tierlist AnimeList={tierlist.data} />
      </div>

      {/* SearchApi con id "search" */}
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