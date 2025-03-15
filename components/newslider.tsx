'use client';
import { Anime } from "@/interface/indes";


export default function Newslider({ AnimeList }: { AnimeList: Anime[] }) {
return (
    <div className="embla" >
        
        <div className="embla__container max-h-[660px]">
            
            <div className="embla-slide
                grid grid-cols-4 grid-rows-5 gap-4
            ">
                <div className="row-span-5">
                    
                </div>
                <div className="col-span-3 row-span-3 col-start-2 row-start-3">

                </div>

            </div>

        </div>
        </div>
);
}