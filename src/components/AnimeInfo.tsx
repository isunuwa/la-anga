import React from "react";

const AnimeInfo = (props: any) => {
  const { title, images:{jpg:{image_url}}, source, rank, score, status, synopsis } =
    props.animeInfo;
  return (
    <>
      <div className="anime-content">
        <h3>{title}</h3>
        <div className="anime-overview">
          <img src={image_url} alt="anime image"/>
          <p>Genral Attributes</p>
          <p>{rank}</p>
          <p>{source}</p>
          <p>{score}</p>
          <p>{status}</p>
        </div>
        <hr />
        <div className="anime-desc">
          <p>{synopsis}</p>
        </div>
      </div>
    </>
  );
};

export default AnimeInfo;
