import React from 'react';
import {useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import dropdownGO from '../Images/dropdownGO.png';
import starIcon from '../Images/starIcon2.png';
import placeholderIMG from '../Images/placeholder.jpg';

const sortArray:any = {
  "Featured": "popularity.desc",
  "Newest": "primary_release_date.desc",
  "Oldest": "primary_release_date.asc",
  "Rating": "vote_average.desc"
}

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

const App: React.FC = () => {

  const [SortByMenu, setSortByMenu] = useState(false);
  const [HamburgerMenu, setHamburgerMenu] = useState(false);
  const [SortBy, setSortBy] = useState("Featured");
  const [hasSearched, setSearched] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [fullTable,setFullTable] = useState<Array<JSX.Element> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const today = new Date();
  const year = today.getFullYear(); 
  const month = String(today.getMonth() + 1).padStart(2, '0'); 
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;    
  const apiKey = "acf60f713a04f5c008b02c954bd8675f";
  const baseURL = "https://api.themoviedb.org/3";
  const imgURL = "https://image.tmdb.org/t/p/w500/";
  const apiurl = hasSearched ? `${baseURL}/search/tv?api_key=${apiKey}&query=${searchText}&include_adult=false&first_air_date.lte=${formattedDate}&include_video=false&with_original_language=en&language=en-US&sort_by=${sortArray[SortBy]}&page=${currentPage > maxPage ? maxPage : currentPage}` : `${baseURL}/discover/tv?api_key=${apiKey}&include_adult=false&first_air_date.lte=${formattedDate}&include_video=false&with_original_language=en&language=en-US&sort_by=${sortArray[SortBy]}&page=${currentPage > maxPage ? maxPage : currentPage}`;

  const UIPageBG = {
    backgroundColor: "rgb(42, 142, 255)"
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

    <Link to = {`/tv/${data.id}`} style = {{backgroundImage: data.poster_path === null ? `url(${placeholderIMG})` : `url(${imgURL}${data.poster_path})`}} tabIndex={0} className = 'MovieItem'>
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
    )

    let searchHandler = (event:any) => {
      if (event.key === "Enter"){
        if (event.target.value === "" || event.target.value === null){
          setSearched(false);
          setSearchText("");
        }
        else{
          setSearched(true);
          setSearchText(event.target.value);
        }
      }
    }    

    let searchHandler2 = (event:any) => {
        if (searchRef.current?.value === "" || searchRef.current?.value === null){
          setSearched(false);
          setSearchText("");
        }
        else{
          setSearched(true);
          setSearchText(searchRef.current?.value ?? "");
        }
    }   
    
    useEffect(() => {
        let query = document.querySelectorAll('.NewReleaseItemTitle');

        query.forEach((item:any,index:number) => {
            if (item.clientHeight > 80){
                item.style.fontSize = '14px';
                item.style.textAlign = "center";
            }
        })
    })

    useEffect(() => {
      setLoading(true);
      fetch(apiurl).then((res) => res.json()).then((data) => {
        let currentTable = data.results;

        setLoading(false);
        console.log(currentTable);
        setCurrentPage(1);
        let newTable:any = [];
        
        currentTable.forEach((item:any,index:number) => {
          newTable.push(newItem(item));
        });

        setFullTable(newTable);
        setTimeout(checkFontSize,1000);
      })
    },[SortBy])

    useEffect(() => {
      setLoading(true);
      fetch(apiurl).then((res) => res.json()).then((data) => {
        let currentTable = data.results;

        setLoading(false);

        let newTable:any = [];
        
        currentTable.forEach((item:any,index:number) => {
          newTable.push(newItem(item));
        });

        setFullTable(newTable);
        setTimeout(checkFontSize,1000);
      })
    },[currentPage])

    useEffect(() => {
      setLoading(true);
      setCurrentPage(1);
      fetch(apiurl).then((res) => res.json()).then((data) => {
        let currentTable = data.results;

        setLoading(false);
        setMaxPage(data.total_pages > 500 ? 500 : data.total_pages);

        let newTable:any = [];
        
        currentTable.forEach((item:any,index:number) => {
          newTable.push(newItem(item));
        });

        setFullTable(newTable);
        setTimeout(checkFontSize,1000);
      })
    },[searchText])


  return (
    <div className="App">
        <div className = 'MovieHeader'>
          <div className = 'TopHeader'>
              <Link to = "/" className = 'HeaderLogo'>Movie<span className = 'HeaderLogoSpecial'>Movie</span></Link>
              <div className = 'HeaderNavButtons'>
                  <Link to = "/" className = 'HeaderNavButton'>Home</Link>
                  <Link to = "/movies" className = 'HeaderNavButton'>Movies</Link>
                  <Link to = "/" className = 'HeaderNavButton'>TV Shows</Link>
              </div>
              <button onClick={() => {setHamburgerMenu(!HamburgerMenu);}} className = 'HeaderHamburger'>
                {HamburgerMenu && <div className = 'HeaderHamburgerDropdown'>
                  <Link to = "/" className = 'HeaderHamburgerDropdownButton'>Home</Link>
                  <Link to = "/movies" className = 'HeaderHamburgerDropdownButton'>Movies</Link>
                  <Link to = "/" className = 'HeaderHamburgerDropdownButton'>TV Shows</Link>
                </div>}
              </button>
          </div>
          <div className = 'BottomHeader'>
            <input ref = {searchRef} onKeyDown={searchHandler} type = "text" placeholder='Search TV Shows' className = 'BottomHeaderSearch' />
            <button onClick={searchHandler2} className = 'BottomHeaderEnter'></button>
            {!hasSearched && <button onClick={() => {setSortByMenu(!SortByMenu)}} className = 'BottomHeaderSortBy'>
              {SortBy}
              <img className = {SortByMenu ? "BottomHeaderLogo BottomHeaderLogoRotate" : "BottomHeaderLogo"} src={dropdownGO}/>
              <div style = {{visibility: SortByMenu == true ? "visible" : "hidden"}} className = 'BottomHeaderSortDropdown'>
                <button onClick={() => {setSortBy("Featured")}} className = 'BottomHeaderSortSelection'>Featured</button>
                <button onClick={() => {setSortBy("Newest")}} className = 'BottomHeaderSortSelection'>Newest</button>
                <button onClick={() => {setSortBy("Oldest")}} className = 'BottomHeaderSortSelection'>Oldest</button>
                <button onClick={() => {setSortBy("Rating")}} className = 'BottomHeaderSortSelection'>Rating</button>
              </div>
            </button>}
          </div>
        </div>
        <div className = 'MovieContent'>
          {isLoading && <span className = 'MovieContentHeader'>Loading...</span>}
          {!hasSearched && <span className = 'MovieContentHeader'>Popular TV Shows</span>}
          <div className = 'MovieGrid'>
            {fullTable}
          </div>
        </div>
        <div className = 'MoviePageUI'>
            <div className = 'MoviePageUIContent'>
                <button onClick={() => {setCurrentPage(1)}} className = 'MoviePageUIBeginning'></button>
                <button onClick={() => {setCurrentPage(currentPage - 1)}} className = 'MoviePageUIPrevious'></button>
                <div className = 'MoviePageUIHolder'>
                    <input step={"1"} inputMode = 'numeric' ref = {inputRef} type='number' onKeyDown={(e)=>{ if (inputRef.current && e.key === "Enter"){
                      if (inputRef.current.value === null || inputRef.current.value === ""){
                        setCurrentPage(1);
                      }
                      else if (parseInt(inputRef.current.value) > 0 && parseInt(inputRef.current.value) < 501){
                        setCurrentPage(Number(inputRef.current.value));
                      } 
                      else if (parseInt(inputRef.current.value) > maxPage){
                        setCurrentPage(maxPage);
                      }
                      else if (parseInt(inputRef.current.value) <= 0){
                        setCurrentPage(1);
                      }
                      inputRef.current.value = "";
                    } }} max={500} min={0} className = 'MoviePageUIPage' />
                    <span className = 'MoviePageUIPageSlash'>{currentPage}/{maxPage}</span>
                </div>
                <button onClick={() => {setCurrentPage(currentPage + 1)}} className = 'MoviePageUINext'></button>
                <button onClick={() => {setCurrentPage(maxPage < 500 ? maxPage : 500)}} className = 'MoviePageUIEnd'></button>
            </div>
        </div>
    </div>
  );
} 

export default App; 

