import {useState,useEffect} from 'react';
import './App.css'
import {FaSearch } from "react-icons/fa"; 
import MovieCard from './MovieCard';

const API_URL ='http://www.omdbapi.com?apikey=80007874';


// const movie1=
//   {
//     "Title": "Beauty and the Beast",
//     "Year": "2017",
//     "imdbID": "tt2771200",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMTUwNjUxMTM4NV5BMl5BanBnXkFtZTgwODExMDQzMTI@._V1_SX300.jpg"
//   }


function App(){
  const [movies, setMovies] = useState([]);
  const [searchTerm,setSearchTerm]=useState('');

  const searchMovies =async (title)=>{
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    setMovies(data.Search);
  }
  useEffect(()=>{
    searchMovies('Beauty')
  },[])

  
  return(
  <div className="app">
    <h1>MovieLand</h1>
    <div className='search'>
    <input 
      placeholder='search for movies'
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)} 
    />
    <FaSearch className="icon" onClick={()=> searchMovies(searchTerm)}/>
    </div>

    {
    movies?.length>0
    ?(
      <div className="container">
      {movies.map((movie)=>(
        <MovieCard movie={movie} />
      ))}
     </div>
      
    ):(
      <div className="empty">
        <h2>no movies found</h2>
      </div>
    )

    }


    
  </div>
  )
}
export default App
