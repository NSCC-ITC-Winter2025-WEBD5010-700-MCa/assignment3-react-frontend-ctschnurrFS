import { useQuery } from '@tanstack/react-query';
import MoviesTable from '../components/movies/MoviesTable';
import { Outlet, useLocation } from 'react-router-dom';

const Movies = () => {

  const location = useLocation()

  console.log(location.pathname)

  const { isPending, error, data: movies} = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      console.log('Fetching Data')
      const response = await fetch(`${import.meta.env.VITE_MOVIES_API_URL}`, {
        credentials: 'include', // Ensures cookies or auth headers are sent
      });
      return response.json()
    },
    staleTime: Infinity
  })

  if (error) return <div>{`An error has occured: ${error.message}`}</div>
  else console.log(movies)

  return (
    <div>
      <h1 className="text-2xl font-bold">Movies</h1>

      { location.pathname === '/admin/movies' ? (
        isPending? <p>Loading...</p> : <MoviesTable movies={movies}/>
      ):<Outlet /> }

    </div>
  );
};
export default Movies;