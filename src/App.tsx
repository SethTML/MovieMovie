import React from 'react';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NotFound from './NotFound';
import LandingApp from './Landing/LandingApp';
import MoviesApp from './Movies/MoviesApp';
import TVApp from './TVShow/TVShowApp';
import Movie from './Movie/Movie';
import TV from './TV/TV';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<LandingApp />}/>
        <Route path = "/movies" element = {<MoviesApp />}/>
        <Route path = "/movie/:id" element = {<Movie />}/>
        <Route path = "/tv" element = {<TVApp />}/>
        <Route path = "/tv/:id" element = {<TV />}/>
        <Route path = "*" element = {<NotFound />}/>
      </Routes>
    </Router>
  );
} 

export default App; 

