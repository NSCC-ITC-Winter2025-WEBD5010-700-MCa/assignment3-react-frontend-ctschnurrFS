import { useQuery } from '@tanstack/react-query';
import BooksTable from '../components/books/BooksTable';
import { Outlet } from 'react-router-dom';

const Books = () => {

  const { isPending, error, data: books} = useQuery({
    queryKey: ['booksData'],
    queryFn: async () => {
      console.log('Fetching Data')
      const response = await fetch('http://localhost:3000/books')
      return response.json()
    },
    staleTime: 5000
  })

  if (error) return <div>{`An error has occured: ${error.message}`}</div>

  return (
    <div>
      <Outlet />
      <h1 className="text-2xl font-bold">Books</h1>
      {
        isPending? <p>Loading...</p> : <BooksTable books={books}/>
      }
    </div>
  );
};
export default Books;