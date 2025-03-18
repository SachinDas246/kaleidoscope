import axios from "axios";
import { MovieSummary } from "../types/movieTypes";

const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL;


export interface SearchResponse {
    Response: string
    Error?: string
    Search?: MovieSummary[]
    totalResults?: string
}
  

export const getSearchedMovies = async (query:string,page:number):Promise<{data:MovieSummary[],total:number}> => {
    const response = await axios.get<SearchResponse>(`${BASE_URL}&s=${query}&page=${page}`);
    if (response.data?.Response !== "True") {
        throw new axios.AxiosError(response.data?.Error || "Something went wrong");
    }    
    return {data:response.data.Search??[],total:parseInt(response.data.totalResults??'0')};
};

export const getMoviesDetails = async (id:string) => {
    const response = await axios.get(`${BASE_URL}&i=${id}`);
    if (response.data?.Response !== "True") {
        throw new axios.AxiosError(response.data?.Error || "Something went wrong");
    }
    return response.data;
};