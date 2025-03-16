import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

function MovieDetails() {
    const { id } = useParams()

    const { data } = useQuery({
        queryKey: ['movies', id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_MOVIES_API_URL}/${id}`)
            return response.json()
        }
    })

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Movie Details - Id: { data?.data._id }</h2>
        <p>{ data }</p>
      </div>
      )
}

export default MovieDetails