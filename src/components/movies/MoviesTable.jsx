import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function MoviesTable({ movies }) {

  const navigate = useNavigate()
  const queryClient = useQueryClient();

  const deleteMovieMutation = useMutation({

    mutationFn: async (movieId) => {
      const response = await fetch(`${import.meta.env.VITE_MOVIES_API_URL}/${movieId}`, {
        method: 'DELETE'
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['moviesData'])
    },
    onError: () => {
      console.log('Unable to Delete')
    }
  })

  const handleDelete=(movieId) => {
    // send a delete request to API to delete chosen/selected record

    if(window.confirm(`Are you sure you wish to delete record ${movieId}?`)){
      deleteMovieMutation.mutate(movieId)
    }
  }

  return (
    <>
      <p><Link to="/admin/movies/create">Add New Movie</Link></p>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Franchise</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Release Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Rating</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            movies.map(movie => {
              return (
              <tr key={ movie._id } className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{movie._id}</td>
                <td className="border border-gray-300 px-4 py-2">{movie.franchise}</td>
                <td className="border border-gray-300 px-4 py-2">{movie.title}</td>
                <td className="border border-gray-300 px-4 py-2">{movie.releaseDate.split('T')[0]}</td>
                <td className="border border-gray-300 px-4 py-2">{movie.MPARating}</td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-1">
                <button className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600">Details</button>
                <button onClick={ () => navigate(`/admin/movies/${movie._id}/edit`)} className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">Edit</button>
                <button onClick={ () => { handleDelete(movie._id) } } className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
              )
            })
          }
        </tbody>
        </table>
    </>
  );
}

export default MoviesTable;