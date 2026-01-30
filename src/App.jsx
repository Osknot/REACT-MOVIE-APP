//Import it like this when you have the default export
import MovieCard from './components/MovieCard'
import Favorite from './pages/Favorites';
//import './App.css'
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import "./css/App.css";
import { MovieProvider } from './contexts/MovieContext';

function App(){
  return(
    <MovieProvider>
      <NavBar/>
     <main>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/Favorites' element={<Favorite/>}/>
        </Routes>
     </main>  
    </MovieProvider>
  )
}


export default App


function Condition() {
  const movieNumber = 2;
  return(
   <>
   {/*Rendering based on a condition*/}
   {/*The condition and then you render*/}
   {movieNumber === 1 ?(
    <MovieCard movie={{title: "Osknot's Film", release_date: "2006"}}/>) : (
    <MovieCard movie={{title: "Obaba's Film", release_date: "2004"}}/>)}
   
   </>

  )
}