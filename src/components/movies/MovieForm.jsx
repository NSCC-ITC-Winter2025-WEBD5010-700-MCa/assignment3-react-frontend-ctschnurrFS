import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export default function MovieForm({onDataCollected, initialData}) {
    const { register, handleSubmit, setValue, formState: { errors }} = useForm()

    useEffect(() => {    if(initialData){
      setValue('franchise', initialData.data.franchise)
      setValue('title', initialData.data.title)
      setValue('releaseDate', initialData.data.releaseDate.split('T')[0])
      setValue('MPARating', initialData.data.MPARating)
    }}, [initialData])

    const validRatings = ["G", "PG", "PG-13", "R", "NC-17"];

    return (
        <form onSubmit={ handleSubmit(onDataCollected) } className="space-y-4">
          <div>
            <input
              {...register('franchise', { required: 'Franchise is required!' } )}
              type="text"
              placeholder="Franchise"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.franchise && <p className="text-red-500 text-sm mt-1">{errors.franchise.message}</p>}
          </div>
          <div>
            <input
              {...register('title', { required: 'Title is required!' })}
              type="text"
              placeholder="Title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <input
              {...register('releaseDate', { required: 'Release Date is required!' })}
              type="text"
              placeholder="Release Date"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.releaseDate && <p className="text-red-500 text-sm mt-1">{errors.releaseDate.message}</p>}
          </div>
          <div>
            <input
              {...register('MPARating', { required: 'Rating is required!', validate: (value) =>
                validRatings.includes(value) || "Invalid rating. Choose G, PG, PG-13, R, or NC-17.", })}
              type="text"
              placeholder="Rating"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.MPARating && <p className="text-red-500 text-sm mt-1">{errors.MPARating.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            Submit Movie
          </button>
        </form>
    )
}