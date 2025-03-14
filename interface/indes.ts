export interface Anime {
  mal_id: number;
  title: string;
  url: string;
  images: {
    webp: {
      large_image_url: string;
    };
  };
  status: string;
  synopsis: string;
  favorites: number;
  popularity: number;
  rank: number;
}

export interface ApiResponse {
  data: Anime[];
}
