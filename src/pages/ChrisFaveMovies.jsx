import { useQuery } from '@tanstack/react-query';
import MoviesTable from '../components/MoviesTable';

const Movies = () => {

  const { isPending, error, data: movies} = useQuery({
    queryKey: ['moviesData'],
    queryFn: async () => {
      console.log('Fetching Data')
      const response = await fetch('http://localhost:3000/movies')
      return response.json()
    }
  })

  if (error) return <div>{`An error has occured: ${error.message}`}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">Chris' Favorite Movies</h1>
      {
        isPending? <p>Loading...</p> : <MoviesTable movies={movies}/>
      }
    </div>
  );
};
export default Movies;