import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addToFav, removeFromFav } from "../../../features/favorites/favSlice";
import { MovieDetails as MovieDetailsType } from "../../../types/movieTypes"

const MovieDetails = ({movie}:{movie:MovieDetailsType}) => {

    const isFavourite = useAppSelector((state) => state.favorite.movies.some(fav => fav.imdbID === movie.imdbID));
    const dispatch = useAppDispatch();
    const toggleFavoriteMovie = (movie: MovieDetailsType) => {
        if (isFavourite) {
          dispatch(removeFromFav(movie.imdbID));
        } else {
          dispatch(addToFav(movie));
        }
    };
    return (
        <div className="px-8 md:px-16 py-8">
            <div className="flex gap-16 flex-col md:flex-row">
                <img className="rounded max-w-48" src={movie.Poster} alt="movie poster" />
                <div className="flex flex-col gap-4">                
                    <p className="dark:text-white text-4xl font-bold">{movie.Title}</p>                    
                    <div>
                        <p className="dark:text-white font-semibold text-gray-700">Runtime: <span className="text-red-700"> {movie.Runtime}</span></p>
                        <p className="dark:text-white font-semibold text-gray-700">Released: <span className="text-red-700"> {movie.Released}</span></p>
                        <p className="dark:text-white font-semibold text-gray-700">Languages: <span className="text-red-700"> {movie.Language}</span></p>
                        <p className="dark:text-white font-semibold text-gray-700">Genre: <span className="text-red-700"> {movie.Genre}</span></p>          
                    </div>
                    <div className="flex md:gap-8">
                        {
                            movie.Ratings.map((rating)=>(
                                <div key={rating.Source}>
                                    <p className="text-3xl text-gray-800 dark:text-white font-bold">{rating.Value}</p>
                                    <p className="text-red-600">{rating.Source}</p>
                                </div>
                            ))
                        }
                    </div>
                    <p className="text-gray-700 dark:text-white">{movie.Plot}</p>
                </div>            
            </div>
            <div className="py-4">
                {
                    isFavourite? (
                        <button onClick={() => toggleFavoriteMovie(movie)} className="flex gap-2 cursor-pointer py-2 px-3.5 bg-red-500 rounded ">
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <p className="text-white">Remove From Favorites</p>                                    
                        </button>
                    ):(
                        <button onClick={() => toggleFavoriteMovie(movie)} className="flex gap-2 cursor-pointer py-2 px-3.5 bg-red-500 rounded">
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <p className="text-white">Add to Favorites</p>
                        </button>
                    )
                }
            </div>
            <hr className="my-8 border-red-300 dark:border-red-700" />
            <div>
                <p className="dark:text-white font-semibold text-gray-700">Director: <span className="text-red-700"> {movie.Director}</span></p>
                <p className="dark:text-white font-semibold text-gray-700">Writer: <span className="text-red-700"> {movie.Writer}</span></p>
                <p className="dark:text-white font-semibold text-gray-700">Actors: <span className="text-red-700"> {movie.Actors}</span></p>          
            </div>       
        </div>
    )
}

export default MovieDetails


