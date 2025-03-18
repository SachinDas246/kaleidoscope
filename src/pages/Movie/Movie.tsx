import { useParams } from "react-router";
import { MovieDetails as MovieDetailsType} from "../../types/movieTypes";
import { useEffect, useState } from "react";
import { getMoviesDetails } from "../../api/movies";
import MovieDetails from "./components/MovieDetails";
import Navbar from "../../components/Navbar/Navbar";
import Spinner from "../../components/Spinner/Spinner";

type RouteParams = {
    id: string
}

type PageState = {
    loading: boolean
    data: MovieDetailsType | null
    error: string
}

const Movie = () => {
    let {id} = useParams<RouteParams>();
    const [movieDetails, setMovieDetails] = useState<PageState>({loading:true,data:null,error:''})   

    useEffect(() => {
        if (!id) return;
        getMoviesDetails(id)
        .then((data) => setMovieDetails({data:data,loading:false,error:''}) )
        .catch((error) => setMovieDetails({ data: null, loading: false, error }))        
        }, []);
    
    return (
        <div className="dark:bg-black min-h-lvh" >
            <Navbar/>
            { movieDetails.loading && <div className="flex justify-center py-16">
              <Spinner/>
            </div>}
            { !movieDetails.loading && movieDetails.error?<div>{movieDetails.error}</div>:null}
            { !movieDetails.loading && movieDetails.data? <MovieDetails movie={movieDetails.data} /> :null}

        </div>

    )
}

export default Movie