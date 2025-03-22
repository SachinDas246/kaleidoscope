import { useCallback, useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";
import { MovieSummary } from "../../types/movieTypes";
import { getSearchedMovies } from "../../api/movies";
import Navbar from "../../components/Navbar/Navbar";
import Paginatior from "./components/Paginator";
import Spinner from "../../components/Spinner/Spinner";

type SearchState = {
  loading: boolean;
  data: MovieSummary[];
  error: string;
};

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalCount,setTotalCount] = useState<number>(246);

  const [searchState, setSearchState] = useState<SearchState>({
    data: [],
    error: "",
    loading: false,
  });

  useEffect(() => {
    if (query.length > 2) {
      const timer = setTimeout(() => {
        setSearchState({ data: [], loading: true, error: "" })
        setPage(1);        
        getSearchedMovies(query,1)
          .then(
            (response) => {
             setSearchState({ data: response.data, loading: false, error: "" });
             setTotalCount(response.total)
            }
          )
          .catch((error) =>            
            setSearchState({ data: [], loading: false, error: error.message ?? "Something went wrong" })
          );
      }, 500);
      return () => clearTimeout(timer);
    } else if (searchState.data.length != 0) {
      setSearchState({ data: [], loading: false, error: "" });
    } else if (searchState.error){
      setSearchState({ data: [], loading: false, error: "" });
    }
  }, [query]);

  useEffect(() => {    
    if (query.length > 2) {
      setSearchState({ data: [], loading: true, error: "" })
      getSearchedMovies(query,page)
      .then(
        (response) =>{setSearchState({ data: response.data, loading: false, error: "" });
        }
      )
      .catch((error) =>            
        setSearchState({ data: [], loading: false, error: error.message ?? "Something went wrong" })
      );
    }
  }, [page]);

  const setPageNumber = useCallback((pg:number) => {
    setPage(pg)
  }, [page]);
  
  return (
    <div className="dark:bg-black min-h-lvh">
      <Navbar />
      <div>
        <div className="flex flex-col items-center gap-8 py-8 px-4">
          <h2 className="font-semibold dark:text-white md:text-7xl text-5xl py-4 px-2 text-center">
            Find movies you <span className="text-red-600">LOVE</span>
          </h2>
          <input
            className="w-full md:w-3/5 placeholder:font-normal font-medium  outline-0 border border-gray-200 dark:border-white dark:text-white rounded-md text-lg py-2 px-4"
            placeholder="Search movies, drama, series ..."
            type="text"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            value={query}
          ></input>
        </div>        
        <div className="mx-8">
          {searchState.loading && (
            <div className="flex justify-center py-16">
              <Spinner/>
            </div>)}
          {!searchState.loading && searchState.error ? (
            <div className="flex justify-center items-center gap-4 py-8">
              <svg className="w-12 h-12 text-red-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clipRule="evenodd"/>
              </svg>
              <p className="text-gray-500 text-xl font-semibold">{searchState.error}</p>              
            </div>
          ) : 
          (!searchState.loading && searchState.data.length? (
            <div>
              <div className="flex justify-center py-4">
                <Paginatior totalItemCount={totalCount} page={page} setPage={setPageNumber}/>
              </div>
              <div className="flex flex-wrap justify-start gap-2 md:gap-4 items-start">
              {searchState.data.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                />
              ))}
            </div>            
            </div>            
          ) : null)}
          <div>
              {
              query.length < 2?(
              <div>
                <p className="text-gray-400 text-center text-sm dark:text-white "> Type atleast 3 letters to get started..</p>
              </div>):null
              }
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default Search;
