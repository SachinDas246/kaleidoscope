
import Navbar from '../../components/Navbar/Navbar'
import {useAppSelector } from '../../app/hooks'
import MovieCard from '../Search/components/MovieCard'


const Favorite = () => {  
  const favorites = useAppSelector((state)=>state.favorite)
  return (
    <div className="dark:bg-black min-h-lvh overflow-auto" >
      <Navbar/>
      <div className='my-8 mx-8 flex flex-col gap-4'>
        <div className=''>
          <h1 className='text-2xl font-semibold text-black dark:text-white'>Your Favorite Movies</h1>
        </div>
        <div className="flex flex-wrap justify-start gap-2 md:gap-4 items-start">
          {
            favorites.movies.map((movie)=> (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))
          }
        </div>
        <div>
          {
            favorites.movies.length == 0 ? (
              <div>
                <p className='text-gray-600 dark:text-white'>Looks like you don't have any movies in favourite</p>
              </div>
            ):null
          }
        </div>
      </div>      
    </div>
  )
}

export default Favorite