import React from 'react';
import {useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import starIcon from '../Images/starIcon2.png';

interface HeroProps {
    currentSlide: number;
    setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
    currentHeroWidth: number;
    setCurrentHeroWidth: React.Dispatch<React.SetStateAction<number>>;
}

const apiKey = "acf60f713a04f5c008b02c954bd8675f";
const baseURL = "https://api.themoviedb.org/3";
const apiURL = `${baseURL}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1`;
const imgURL = "https://image.tmdb.org/t/p/original/";

// array of TMBD Genre IDs

const GenreIDArray:any = {
    28:"Action",
    12:"Adventure",
    16:"Animation",
    35:"Comedy",
    80:"Crime",
    99:"Documentary",
    18:"Drama",
    10751:"Family",
    14:"Fantasy",
    36:"History",
    27:"Horror",
    10402:"Music",
    9648:"Mystery",
    10749:"Romance",
    878:"Science Fiction",
    10770:"TV Movie",
    53:"Thriller",
    10752:"War",
    37:"Western"
}

const Hero: React.FC<HeroProps> = ({currentSlide,setCurrentSlide,currentHeroWidth,setCurrentHeroWidth}) => {

    const [HamburgerMenu, setHamburgerMenu] = useState(false);
    const [data, setData] = useState<Array<{ title: string,genre_ids: number[], overview: string,vote_average:number, backdrop_path:string, id:number }> | null>(null);

    const sliderStyle = {
        transform: `translateX(-${currentHeroWidth * (currentSlide - 1)}px)`,
    }

    const getMovies = (url:string) => {
        fetch(url).then(res => res.json()).then(data => {
            setData(data.results);
        })
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            let currentWidth = window.innerWidth;
            let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            let trueWidth = currentWidth - scrollBarWidth;

            setCurrentHeroWidth(trueWidth);
        });

        window.addEventListener('load', () => {
            let currentWidth = window.innerWidth;
            let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            let trueWidth = currentWidth - scrollBarWidth;

            console.log(trueWidth);
            setCurrentHeroWidth(trueWidth);
        });

        let currentWidth = window.innerWidth;
        let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        let trueWidth = currentWidth - scrollBarWidth;

        setCurrentHeroWidth(trueWidth);
        
        getMovies(apiURL);
    }
    );

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(currentSlide === 4){
                setCurrentSlide(1);
            }else{
                setCurrentSlide(currentSlide + 1);
            }
        },15000);
        return () => clearInterval(interval);
    },[currentSlide]);

  return (
    <div className="Hero">
        <div className = 'Header'>
            <div className = 'HeaderContent'>
            <Link to = "/" className = 'HeaderLogo'>Movie<span className = 'HeaderLogoSpecial'>Movie</span></Link>
              <div className = 'HeaderNavButtons'>
                  <Link to = "/" className = 'HeaderNavButton'>Home</Link>
                  <Link to = "/movies" className = 'HeaderNavButton'>Movies</Link>
                  <Link to = "/tv" className = 'HeaderNavButton'>TV Shows</Link>
              </div>
              <button onClick={() => {setHamburgerMenu(!HamburgerMenu);}} className = 'HeaderHamburger'>
                {HamburgerMenu && <div className = 'HeaderHamburgerDropdown'>
                  <Link to = "/" className = 'HeaderHamburgerDropdownButton'>Home</Link>
                  <Link to = "/movies" className = 'HeaderHamburgerDropdownButton'>Movies</Link>
                  <Link to = "/tv" className = 'HeaderHamburgerDropdownButton'>TV Shows</Link>
                </div>}
              </button>
            </div>
        </div>
        <div style = {sliderStyle} className = 'HeroSlider'>
            <div style = { {backgroundImage: `url(${imgURL + (data != null ? data[0]["backdrop_path"] : "...")})`} } className = 'HeroItem'>
                <div className = 'HeroItemContent'>
                    <span className = 'HeroItemCategory'>{data != null ? GenreIDArray[data[0]["genre_ids"][0]] : "..."}</span>
                    <div className = 'HeroItemStars'>
                        <img className = 'HeroItemStar' src = {starIcon} />
                        <span className = 'HeroItemStarFont'>{data != null ? (data[0].vote_average + "/10") : "..."}</span>
                    </div>
                    <span className = 'HeroItemTitle'>{data != null ? data[0].title : "..."}</span>
                    <span className = 'HeroItemDesc'>{data != null ? data[0].overview : "..."}</span>
                    <Link to = {data != null ? ("/movie/" + data[0].id) : "/"}className = 'HeroItemPlay'>DISCOVER</Link>
                </div>
                <div className = 'HeroViginette'>

                </div>
            </div>
            <div style = { {backgroundImage: `url(${imgURL + (data != null ? data[1]["backdrop_path"] : "...")})`} } className = 'HeroItem'>
                <div className = 'HeroItemContent'>
                    <span className = 'HeroItemCategory'>{data != null ? GenreIDArray[data[1]["genre_ids"][0]] : "..."}</span>
                    <div className = 'HeroItemStars'>
                        <img className = 'HeroItemStar' src = {starIcon} />
                        <span className = 'HeroItemStarFont'>{data != null ? (data[1].vote_average + "/10") : "..."}</span>
                    </div>
                    <span className = 'HeroItemTitle'>{data != null ? data[1].title : "..."}</span>
                    <span className = 'HeroItemDesc'>{data != null ? data[1].overview : "..."}</span>
                    <Link to = {data != null ? ("/movie/" + data[1].id) : "/"}className = 'HeroItemPlay'>DISCOVER</Link>
                </div>
                <div className = 'HeroViginette'>

                </div>
            </div>
            <div style = { {backgroundImage: `url(${imgURL + (data != null ? data[2]["backdrop_path"] : "...")})`} } className = 'HeroItem'>
                <div className = 'HeroItemContent'>
                    <span className = 'HeroItemCategory'>{data != null ? GenreIDArray[data[2]["genre_ids"][0]] : "..."}</span>
                    <div className = 'HeroItemStars'>
                        <img className = 'HeroItemStar' src = {starIcon} />
                        <span className = 'HeroItemStarFont'>{data != null ? (data[2].vote_average + "/10") : "..."}</span>
                    </div>
                    <span className = 'HeroItemTitle'>{data != null ? data[2].title : "..."}</span>
                    <span className = 'HeroItemDesc'>{data != null ? data[2].overview : "..."}</span>
                    <Link to = {data != null ? ("/movie/" + data[2].id) : "/"}className = 'HeroItemPlay'>DISCOVER</Link>
                </div>
                <div className = 'HeroViginette'>

                </div>
            </div>
            <div style = { {backgroundImage: `url(${imgURL + (data != null ? data[3]["backdrop_path"] : "...")})`} } className = 'HeroItem'>
                <div className = 'HeroItemContent'>
                    <span className = 'HeroItemCategory'>{data != null ? GenreIDArray[data[3]["genre_ids"][0]] : "..."}</span>
                    <div className = 'HeroItemStars'>
                        <img className = 'HeroItemStar' src = {starIcon} />
                        <span className = 'HeroItemStarFont'>{data != null ? (data[3].vote_average + "/10") : "..."}</span>
                    </div>
                    <span className = 'HeroItemTitle'>{data != null ? data[3].title : "..."}</span>
                    <span className = 'HeroItemDesc'>{data != null ? data[3].overview : "..."}</span>
                    <Link to = {data != null ? ("/movie/" + data[3].id) : "/"}className = 'HeroItemPlay'>DISCOVER</Link>
                </div>
                <div className = 'HeroViginette'>

                </div>
            </div>
        </div>
        <div className = 'HeroItemIndicatorBox'>
            <button onClick={() => {setCurrentSlide(1)}} className = {currentSlide === 1 ? "HeroItemIndicated" : 'HeroItemIndicator'}></button>
            <button onClick={() => {setCurrentSlide(2)}} className = {currentSlide === 2 ? "HeroItemIndicated" : 'HeroItemIndicator'}></button>
            <button onClick={() => {setCurrentSlide(3)}} className = {currentSlide === 3 ? "HeroItemIndicated" : 'HeroItemIndicator'}></button>
            <button onClick={() => {setCurrentSlide(4)}} className = {currentSlide === 4 ? "HeroItemIndicated" : 'HeroItemIndicator'}></button>
        </div>
    </div>
  );
} 

export default Hero; 

