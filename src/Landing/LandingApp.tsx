import React from 'react';
import Hero from './Hero';
import Features from './Features';
import {useState,useEffect} from 'react';

const App: React.FC = () => {
  const [currentSlide,setCurrentSlide] = useState(1);
  const [currentHeroWidth,setCurrentHeroWidth] = useState(1);
  return (
    <div className="App">
      <Hero 
        currentSlide = {currentSlide}
        setCurrentSlide = {setCurrentSlide}
        currentHeroWidth = {currentHeroWidth}
        setCurrentHeroWidth = {setCurrentHeroWidth}
      />
      <Features />
    </div>
  );
} 

export default App; 

