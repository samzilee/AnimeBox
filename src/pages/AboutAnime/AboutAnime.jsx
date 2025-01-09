import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FetchAbout from "./FetchAbout";
import "./about.css";
import Loader from "../../Loader";
import Image from "./components/section1/Image";
import AnimeInfo from "./components/section1/AnimeInfo";
import CharacterList from "./components/section2/CharacterList";

import Error from "../../Error";
import FetchEpisodes from "./FetchEpisodes";
import EpList from "./components/section2/EpList";
import RelatedAnimes from "./components/section2/RelatedAnimes";

//About-main-page
const AboutAnime = () => {
  const [mainAnimeData, setMainAnimeData] = useState();
  const [animeData, setAnimeData] = useState(null);

  const [error, setError] = useState(false);
  const [animeId, setAnimeId] = useState("");
  const [availableEp, setAvailableEp] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [characters, setCharacters] = useState([]);

  if (error) return <Error />;
  return (
    <main id="mainAbout">
      <FetchAbout
        setMainAnimeData={setMainAnimeData}
        setAnimeData={setAnimeData}
        setError={setError}
        setCharacters={setCharacters}
        setFetching={setFetching}
      />
      <FetchEpisodes
        setAnimeId={setAnimeId}
        setAvailableEp={setAvailableEp}
        setFetching={setFetching}
      />

      {animeData !== null && !fetching ? (
        <>
          <Image animeData={animeData} />
          <AnimeInfo
            mainAnimeData={mainAnimeData}
            animeData={animeData}
            animeId={animeId}
            availableEp={availableEp}
          />
          <EpList animeData={animeData} availableEp={availableEp} />
          <CharacterList characters={characters} trailer={animeData.trailer} />
          <RelatedAnimes related={mainAnimeData.relatedAnimes.slice(0, 15)} />
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default AboutAnime;
