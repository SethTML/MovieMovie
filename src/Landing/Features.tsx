import React from 'react';
import {useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import starIcon from '../Images/starIcon2.png';

const Features: React.FC = () => {

    const [fullTable,setFullTable] = useState<Array<JSX.Element> | null>(null);
    const [slideAmount,setSlideAmount] = useState(1);
    const [TVfullTable,setTVFullTable] = useState<Array<JSX.Element> | null>(null);
    const [TVslideAmount,setTVSlideAmount] = useState(1);
  
    const today = new Date();
    const year = today.getFullYear(); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;    
    const apiKey = "acf60f713a04f5c008b02c954bd8675f";
    const baseURL = "https://api.themoviedb.org/3";
    const apiURL = `${baseURL}/discover/movie?api_key=${apiKey}&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&with_original_language=en&release_date.lte=${formattedDate}&vote_average.gte=1&page=1`;
    const apiURL2 = `${baseURL}/discover/tv?api_key=${apiKey}&include_adult=false&release_date.lte=${formattedDate}&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=1`;
    const imgURL = "https://image.tmdb.org/t/p/original/";
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
        10767:"Talk Show",
        10763:"News",
        10764:"Reality",
        10759:"Action & Adventure",
        10762:"Kids",
        10765:"Sci-Fi & Fantasy",
        10766:"Soap",
        10768:"War & Politics"
    }

    const sliderStyle = {
        transform: `translateX(-${(slideAmount - 1) * 280}px)`,
    }

    const sliderStyle2 = {
        transform: `translateX(-${(TVslideAmount - 1) * 380}px)`,
    }

    let checkFontSize = () => {
        let query = document.querySelectorAll('.NewReleaseItemTitle');

        query.forEach((item:any,index:number) => {
            if (item.clientHeight > 80){
                item.style.fontSize = '14px';
                item.style.textAlign = "center";
            }
        })
    }

    let newItem = (data:any) => (

        <Link to = {`/movie/${data.id}`} style = {{backgroundImage: `url(${imgURL}${data.poster_path})`}} tabIndex={0} className = 'NewReleaseItem'>
                <div className = 'NewReleaseItemContent'>
                    <span className = 'NewReleaseItemGenre'>{GenreIDArray[data["genre_ids"][0]]}</span>
                    <div className = 'NewReleaseItemRating'>
                        <img className = 'NewReleaseItemRatingIcon' src = {starIcon} alt = 'starIcon' />
                        <span className = 'NewReleaseItemRatingText'>{data.vote_average === 0 ? "NA" : data.vote_average}/10</span>
                    </div>
                    <span className = 'NewReleaseItemTitle'>{data.title}</span>
                </div>
                <div className = 'NewReleaseItemViginette'>

                </div>
        </Link>
    )

    let newTVItem = (data:any) => (

        <Link to = {`/tv/${data.id}`} style = {{backgroundImage: `url(${imgURL}${data.poster_path})`}} tabIndex={0} className = 'FeaturedTVItem'>
                <div className = 'NewReleaseItemContent'>
                    <span className = 'NewReleaseItemGenre'>{GenreIDArray[data["genre_ids"][0]]}</span>
                    <div className = 'NewReleaseItemRating'>
                        <img className = 'NewReleaseItemRatingIcon' src = {starIcon} alt = 'starIcon' />
                        <span className = 'NewReleaseItemRatingText'>{data.vote_average}/10</span>
                    </div>
                    <span className = 'NewReleaseItemTitle'>{data.name}</span>
                </div>
                <div className = 'NewReleaseItemViginette'>

                </div>
        </Link>
    )

    useEffect(() => {
        fetch(apiURL).then(res => res.json()).then(data => {

            const movieTable = data.results;
            
            let fullTable:any = [];
            movieTable.forEach((item:any,index:number) =>{
                fullTable.push(newItem(movieTable[index]))
            });

            setFullTable(fullTable);
            setTimeout(checkFontSize,1000);
        });
    },[])

    useEffect(() => {
        fetch(apiURL2).then(res => res.json()).then(data => {

            const movieTable = data.results;

            let fullTable2:any = [];
            movieTable.forEach((item:any,index:number) =>{
                fullTable2.push(newTVItem(movieTable[index]))
            });

            setTVFullTable(fullTable2);
            setTimeout(checkFontSize,1000);
        });
    },[])

  return (
    <div className="Features">
        <div className = 'NewRelease'>
            <Link className = 'NewReleaseText' to = '/tv'>New Releases {`>`}</Link>
            <div className = 'NewReleaseSlider'>
                <button onClick = {() => {slideAmount > 1 ? setSlideAmount(slideAmount - 1) : setSlideAmount(slideAmount)}} className = 'NewReleaseSliderLeft'>
                    <span className = 'NewReleaseSliderArrow'>{`<`}</span>
                </button>
                <div style = {sliderStyle} className = 'NewReleaseSlider2'>
                    {fullTable}
                </div>
                <button onClick = {() => {slideAmount < 21 ? setSlideAmount(slideAmount + 1) : setSlideAmount(slideAmount)}} className = 'NewReleaseSliderRight'>
                    <span className = 'NewReleaseSliderArrow'>{`>`}</span>
                </button>
            </div>
        </div>
        <div className = 'FeaturedTV'>
            <Link className = 'FeaturedTVText' to = '/tv'>Featured TV Shows {`>`}</Link>
            <div className = 'FeaturedTVSlider'>
                <button onClick = {() => {TVslideAmount > 1 ? setTVSlideAmount(TVslideAmount - 1) : setTVSlideAmount(TVslideAmount)}} className = 'NewReleaseSliderLeft'>
                    <span className = 'NewReleaseSliderArrow'>{`<`}</span>
                </button>
                <div style = {sliderStyle2} className = 'NewReleaseSlider2'>
                    {TVfullTable}
                </div>
                <button onClick = {() => {TVslideAmount < 21 ? setTVSlideAmount(TVslideAmount + 1) : setTVSlideAmount(TVslideAmount)}} className = 'NewReleaseSliderRight'>
                    <span className = 'NewReleaseSliderArrow'>{`>`}</span>
                </button>
            </div>
        </div> 
    </div>
  );
} 

export default Features; 

