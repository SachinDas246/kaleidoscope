import { MovieSummary } from '../../../types/movieTypes'
import { Link } from "react-router";

import { memo} from "react";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addToFav, removeFromFav } from '../../../features/favorites/favSlice';

interface MovieCardType {
    movie:MovieSummary
}

const MovieCard = ({movie}:MovieCardType) => {    

    const dispatch = useAppDispatch();
    const isFavourite = useAppSelector((state) => state.favorite.movies.some(fav => fav.imdbID === movie.imdbID));

    const toggleFavoriteMovie = (movie: MovieSummary) => {
        if (isFavourite) {
          dispatch(removeFromFav(movie.imdbID));
        } else {
          dispatch(addToFav(movie));
        }
    };
    
  return (
    <Link to={"/movie/"+movie.imdbID} >
        <div className=" px-2 py-2 rounded max-w-36 md:max-w-48 cursor-pointer  dark:hover:bg-white hover:bg-black  transition-all duration-300 hover:scale-105 group">
            <img className="rounded " src={movie.Poster} alt="movie poster" />
            <div className='flex items-center py-2'>
                <div className='flex-1'>
                    <p className="text-red-800 font-medium group-hover:text-red-600 dark:text-red-600 dark:group-hover:text-red-800">{movie.Title}</p>
                    <p className="text-gray-700 dark:text-white group-hover:text-white group-hover:dark:text-black text-sm ">{movie.Year}</p>
                </div>
                <div className='group/fav relative'>
                    <button className='cursor-pointer' onClick={(e)=>{e.preventDefault();e.stopPropagation(); toggleFavoriteMovie(movie) }}>
                        {
                            isFavourite?(
                                <svg className ="w-7 h-7 text-rose-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                                </svg>
                            ):(
                                <svg className ="w-7 h-7 text-gray-600 group-hover:text-white group-hover:dark:text-gray-700 dark:text-white group-hover/fav:text-rose-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                                </svg>
                            )
                        }
                    </button>
                </div>
            </div>
            
        </div>
    </Link>
  )
}


export default memo(MovieCard)