import React from 'react';
import {useState,useEffect,useRef} from 'react';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import starIcon from '../Images/starIcon2.png';
import placeholder from '../Images/placeholder.jpg';
import '../Landing/LandingCSS';


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
    37:"Western",
    10765:"Sci-Fi & Fantasy",
    10766:"Soap",
    10767:"Talk",
    10768:"War & Politics",
    10759:"Action & Adventure",
    10762:"Kids",
    10763:"News",
    10764:"Reality"
}

const Hero: React.FC = () => {
    const {id} = useParams();
    const [HamburgerMenu, setHamburgerMenu] = useState(false);
    const [itemData,setItemData] = useState<any>(null);
    const [fullTable,setFullTable] = useState<any>(null);

    const apiKey = "acf60f713a04f5c008b02c954bd8675f";
    const baseURL = "https://api.themoviedb.org/3";
    const imgURL = "https://image.tmdb.org/t/p/original/";
    const apiurl2 = `${baseURL}/tv/${id}?api_key=${apiKey}&language=en-US`;
    const reccomendationsURL = `${baseURL}/tv/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`;

    let newItem = (data:any) => (

      <Link to = {`/tv/${data.id}`} style = {{backgroundImage: data.poster_path === null ? `url(${placeholder})` : `url(${imgURL}${data.poster_path})`}} tabIndex={0} className = 'RecommendationItem'>
              <div className = 'MovieItemContent'>
                  <span className = 'NewReleaseItemGenre'>{GenreIDArray[data["genre_ids"][0]]}</span>
                  <div className = 'NewReleaseItemRating'>
                      <img className = 'NewReleaseItemRatingIcon' src = {starIcon} alt = 'starIcon' />
                      <span className = 'NewReleaseItemRatingText'>{data.vote_average === 0 ? "NA" : data.vote_average}/10</span>
                  </div>
                  <span className = 'NewReleaseItemTitle'>{data.name}</span>
              </div>
              <div className = 'MovieItemViginette'>
  
              </div>
      </Link>
    );

    useEffect(() => {
        fetch(apiurl2).then((res) => res.json()).then((data) => {
          setItemData(data); 
          console.log(data);
        });
    },[id])

    useEffect(() => {
      fetch(reccomendationsURL).then((res) => res.json()).then((data) => {
        setFullTable(data.results); 
        console.log(data);
      });
    },[id])

  return (
    <div className = 'Movie'>
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

        <div style = {{backgroundImage: itemData == null ? `url(${placeholder})` : `url(${imgURL + itemData.backdrop_path})`}} className = 'MovieHero'>
          <div className='MovieHeroContent'>
            <img className = 'MovieHeroImage' src = {itemData == null ? `${placeholder}` : `${imgURL + itemData.poster_path}`}/>
            <div className = 'MovieHeroInfo'>
              <span className = 'MovieHeroTitle'>{itemData != null ? itemData.name : "..."}</span>
              <div className='MovieHeroInfo2'>
                <span className = 'MovieHeroLanguage'>{itemData != null ? itemData?.original_language?.toUpperCase() : "..."}</span>
                <span className = 'MovieHeroGenre'>{itemData != null ? itemData?.genres?.[0]?.name : "..."}</span>
                <span className = 'MovieHeroYear'>{itemData != null ? itemData?.first_air_date?.substring(0,4) : "..."}</span>
                <span className = 'MovieHeroTime'>{itemData != null ? itemData?.number_of_seasons : "0"} Seasons</span>
              </div>
              <span className = 'MovieHeroSubtitle'>Overview:</span>
              <span className = 'MovieHeroDesc'>{itemData != null ? itemData?.overview : "..."}</span>
              <div className = 'MovieHeroInfo3'>
                <span className = 'MovieHeroDesc2'>User Rating: <br/><span className = 'MovieHeroDescWeight' ><img className = 'MovieHeroStar' src = {starIcon}/>{itemData != null ? itemData?.vote_average : "..."}/10</span> </span>
                <span className = 'MovieHeroDesc2'>Producers: <br/><span className = 'MovieHeroDescWeight'>{itemData != null ? itemData?.production_companies?.map((item:any,index:any) => {return(index == itemData.production_companies.length - 1 ?  item.name + "." : item.name + ", ")}) : "..."}</span></span>
              </div>
              <button onClick={() => {alert("Coming Soon! (maybe 😅)")}} className = 'MovieHeroButton'>
                WATCH NOW
              </button>
            </div>
          </div>
          <div className = 'MovieHeroViginette'>

          </div>
        </div>

        <div className = 'MovieRecommendations'>
          <span className = 'MovieContentHeader'>{fullTable?.length == 0 ? 'No Current Recommendations' : 'Recommended TV Shows'}</span>
          <div className = 'MovieRecommendationContent'>
            {fullTable != null ? fullTable.map((item:any,index:any) => {if (index < 4){return newItem(item)}}) : ""}
          </div>
        </div>
        
    </div>
  );
} 

export default Hero; 

