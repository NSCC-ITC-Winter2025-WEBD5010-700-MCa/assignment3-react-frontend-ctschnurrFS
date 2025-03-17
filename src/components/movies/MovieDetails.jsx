import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import MovieForm from './MovieForm.jsx'

function MovieDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['movies', id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_MOVIES_API_URL}/${id}`)
            return response.json()
        }

    })

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Movie Details - Id: { data?.data._id }</h2>
        <pre>{JSON.stringify(data?.data, null, 2)}</pre>
      </div>
      )
}

export default MovieDetails