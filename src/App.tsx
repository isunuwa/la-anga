// all scss files
import "./assets/scss/style.scss";

import { useEffect, useState, useCallback, useRef } from "react";
import AnimeList from "./components/AnimeList";
import AnimeInfo from "./components/AnimeInfo";

const base_url = `https://api.jikan.moe/v4/anime?q=`;

// debounce search
const debounce = (
  func: { (inputVal: string): Promise<void>; (arg0: any): any },
  wait: number | undefined
) => {
  let timeout: number | undefined;

  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

function App() {
  const [animeData, setAnimeData] = useState();
  const [search, setSearch] = useState(String);
  const [animeInfo, setAnimeInfo] = useState();

  const inputElem = useRef(null);

  // get data from jikan api
  const getAnimeData = async () => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&limit=20`
    );
    const resData = await res.json();
    setAnimeData(resData.data);
  };

  // function for getting searched data
  const getSearchAnimeData = async (inputVal: string) => {
    try {
      if (inputVal !== "") {
        const res = await fetch(`${base_url}${inputVal}`);
        const resData = await res.json();
        setAnimeData(resData.data);
      } else {
        getAnimeData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = useCallback(
    debounce((inputVal: string) => getSearchAnimeData(inputVal), 500),
    []
  );

  useEffect(() => {
    getAnimeData();
  }, [search]);

  return (
    <>
      <div className="header">
        <div className="logo">
          <h1>
            la<span>Anga</span>
          </h1>
        </div>
        <div className="menu">
          <div className="links"></div>
          <div className="search">
            <input
              type="search"
              name="search"
              placeholder="eg: Bleach"
              ref={inputElem}
              onChange={() => {
                handleSearch(inputElem.current?.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="anime_info">
          {animeInfo && <AnimeInfo animeInfo={animeInfo} />}
        </div>
        <div className="anime-container">
          <div className="row">
            <AnimeList animeList={animeData} setAnimeInfo={setAnimeInfo} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
