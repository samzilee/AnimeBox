import React, { useEffect, useState } from "react";
import "./H.css";
import Section1 from "./Section1";
import Section2 from "./Section2";
import BackGround from "./BackGround";
import FetchHeader from "./FetchHeader";
import Nav from "./Nav";
import Loader from "../../../../Loader";
import Error from "../../../../Error";
import FetchContinuedAnime from "./FetchContinuedAnime";
import ContinueWatching from "./ContinueWatching";

const MainHeader = () => {
  const [animeList, setAnimeList] = useState([]);
  const [animeSlideID, setSlideID] = useState(0);
  const [NowShowing, setNowShowing] = useState(null);
  const [fetchingError, setFetchingError] = useState(false);
  const [continueWatch, setContinueWatch] = useState(null);

  useEffect(() => {
    if (animeList.length < 10) return;
    const interval = setInterval(() => {
      setSlideID((current) => {
        if (current >= animeList.length - 1) return 0;
        return current + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [animeList]);

  useEffect(() => {
    if (animeList.length === 10 && animeSlideID <= animeList.length) {
      setNowShowing(animeList[animeSlideID]);
    }
  }, [animeSlideID, animeList]);

  useEffect(() => {
    if (!NowShowing) return;
    animeList.map((anime) => {
      const allIndex = document.getElementById(anime.info.anime_id);
      allIndex.style.opacity = "0.7";
      allIndex.style.scale = "";
    });
    const animeIndexDisplay = document.getElementById(NowShowing.info.anime_id);

    animeIndexDisplay.style.opacity = "1";
    animeIndexDisplay.style.scale = "1.2";
  }, [NowShowing]);

  if (fetchingError) return <Error />;

  return (
    <header className="Hfooter h-[400px] flex flex-col justify-between relative md:h-screen  pb-5">
      <FetchHeader
        setAnimeList={setAnimeList}
        setFetchingError={setFetchingError}
      />
      <FetchContinuedAnime setContinueWatch={setContinueWatch} />
      <ul className="flex gap-2 absolute bottom-[5px] w-full justify-center">
        {animeList[0]
          ? animeList.map((anime, index) => {
              return (
                <li
                  key={index}
                  id={anime.info.anime_id}
                  className="p-1 rounded-full bg-blue-400 opacity-[0.7] transition-all duration-[0.5s]"
                ></li>
              );
            })
          : null}
      </ul>

      {!animeList[0] ? (
        <Loader />
      ) : (
        <>
          <Section1 />
          <BackGround NowShowing={NowShowing} />
          <Section2 NowShowing={NowShowing} />
          <ContinueWatching continueWatch={continueWatch} />
        </>
      )}

      {animeList.length >= 5 ? <Nav setSlideID={setSlideID} /> : null}
    </header>
  );
};

export default MainHeader;
