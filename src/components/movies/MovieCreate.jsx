import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import MovieForm from './MovieForm.jsx'

function MovieCreate() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const createMovieMutation = useMutation({
        mutationFn: async (data) => {
            const response = await fetch(`${import.meta.env.VITE_MOVIES_API_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['moviesData'])
            navigate('/admin/movies')
        }
    })

    const processData = (data) => {
        console.log(data)
        createMovieMutation.mutate(data)
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Movie</h2>
            <MovieForm onDataCollected={processData}/>
        </div>
      );
}

export default MovieCreate;