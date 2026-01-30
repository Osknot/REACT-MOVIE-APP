import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css"

function Home(){
    //states to pesist across reruns and renders else the vale of the varaible will be lost and state from scratch or reset

   const [querySearch, setQuerySearch] = useState("");
   const [movies, setMovie] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true)

   useEffect(()=>{
    const loadPopularMovies = async () => {
      try{
        const popularMovies = await getPopularMovies()
        setMovie(popularMovies)
      }catch(err){
        console.log(err)
        setError("Failed to load movies...")
      }
      finally{
        setLoading(false)
      }
    }
    loadPopularMovies()
   }, []);


     const handleSearch = async (e) => {
          e.preventDefault();
          if (!querySearch.trim()) return
          if (loading) return

          setLoading(true)
          try {
              const searchResults = await searchMovies(querySearch)
              setMovie(searchResults)
              setError(null)
          } catch (err) {
              console.log(err)
              setError("Failed to search movies...")
          } finally {
              setLoading(false)
          }
  };

    return(
         <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                type="text"
                placeholder="Search for movies..."
                className="search-input"
                value={querySearch}
                onChange={(e)=>setQuerySearch(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading? <div className="loading">Loading...</div> : 
             <div className="movies-grid">
                {movies.map(
                (movie) =>
                 (<MovieCard movie={movie} key={movie.id}/>)
            )}
            </div>
            }
           
         </div>
    )
}

export default Home;



/*
THIS IS REALLY COOL FOR SEARCHING FOR SOMETHING WHEN YOU HAVE THE DATA IN OBJECT AND NOT API
function Search(){
     const [querySearch, setQuerySearch] = useState("")
   const movies = [
    {
      "id": 1,
      "title": "Inception",
      "release_date": "2010-07-16"
    },
    {
      "id": 2,
      "title": "The Matrix",
      "release_date": "1999-03-31"
    },
    {
      "id": 3,
      "title": "Interstellar",
      "release_date": "2014-11-07"
    },
    {
      "id": 4,
      "title": "Spider-Man: Across the Spider-Verse",
      "release_date": "2023-06-02"
    },
    {
      "id": 5,
      "title": "Dune: Part Two",
      "release_date": "2024-03-01"
    }
  ]
    const handleSearch = (e) =>{
        e.preventDefault();
        alert(querySearch)

    }

    return(
         <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                type="text"
                placeholder="Search for movies..."
                className="search-input"
                value={querySearch}
                onChange={(e)=>setQuerySearch(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            <div className="movies-grid">
                {movies.map(
                (movie) =>
                  movie.title.toLowerCase().startsWith(querySearch) &&  (<MovieCard movie={movie} key={movie.id}/>)
            )}
            </div>
         </div>
    )

}*/