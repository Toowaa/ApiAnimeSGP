export interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  }
  
  export interface Anime {
    mal_id: number;
    title: string;
    url: string;
    images: {
      webp: {
        image_url: string;
        small_image_url: string;
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
    pagination: Pagination;
    data: Anime[];
  }