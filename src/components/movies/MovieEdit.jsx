import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import MovieForm from './MovieForm.jsx'

function MovieEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    console.log("ID:")
    console.log(id)

    const { data } = useQuery({
        queryKey: ['movies', id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_MOVIES_API_URL}/${id}`)
            return response.json()
        }
    })

    const editMovieMutation = useMutation({
      mutationFn: async (data) => {
        const response = await fetch(`${import.meta.env.VITE_MOVIES_API_URL}/${id}`, {
          method: `PUT`,
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })

        return response.json()
      },
      onSuccess: () => {
          queryClient.invalidateQueries(['moviesData'])
          navigate('/admin/movies')
      }
    })

    useEffect(() => {
        console.log(`useEffect:`)
        console.log(data)
        // pre-populate the form
        // if(data){
        //     setValue('title', data.title)
        //     setValue('author', data.author)
        //     setValue('published_year', data.published_year)
        //     setValue('genre', data.genre)
        // }
    }, [data])

    const processData = (data) => {
      editMovieMutation.mutate(data);
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Movie - Id: { data.data?._id }</h2>
        <MovieForm onDataCollected={processData} initialData={data}/>
      </div>
      )
}

export default MovieEdit