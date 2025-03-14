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
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
  genres: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
}



export interface ApiResponse {
  data: Anime[];
}
