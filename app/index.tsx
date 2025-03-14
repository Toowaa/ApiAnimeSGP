import { ApiResponse } from "@/interface/indes";


export async function fetchData(): Promise<ApiResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/random/anime`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos');
  }
  const result: ApiResponse = await res.json();
  return result;
}


export async function TierlistApi(){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/top/anime`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos');
  }
  const result: ApiResponse = await res.json();
  return result;
}

export async function AllAnimesApi(page: number = 1) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anime?page=${page}`);
  if (!res.ok) {
    throw new Error('Error al obtener los datos');
  }
  const result: ApiResponse = await res.json();
  return result;
}