
import Random from "@/components/random";
import Slider from "@/components/slider";
import { fetchData, TierlistApi } from ".";
import Tierlist from "@/components/tierlist";


export default async function Home() {
  const data = await fetchData(); 
  const tierlist = await TierlistApi();
  return (
    <div className="pt-24 h-screen">
      <Slider />
      <Random data={data as any} /> 
      <Tierlist AnimeList={tierlist.data} />
      
    </div>
  );
}