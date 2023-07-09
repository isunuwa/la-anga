import React from "react";

const AnimeList = ({ animeList, setAnimeInfo }: any) => {
  return (
    <>
      {/* {console.log(animeList)} */}
      
      {animeList
        ? animeList.map((anime: any, index: number) => {
            return (
              <div
                className="card"
                key={index}
                onClick={() => setAnimeInfo(anime)}
              >
                <img src={anime.images.jpg.large_image_url} alt="animeImage" />
                <div className="anime_info">
                  <div className="anime_name">{anime.title}</div>
                  <div className="anime_desc"></div>
                </div>
              </div>
            );
          })
        : "No anime found"}
    </>
  );
};

export default AnimeList;
