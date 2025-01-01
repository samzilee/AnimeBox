import React, { useEffect, useState } from "react";
import "./H.css";
import Section1 from "./section1";
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
    if (animeList.length < 7) return;
    const intervalId = setInterval(() => {
      setSlideID((prevValue) => {
        if (prevValue >= animeList.length) return 0;
        return prevValue + 1;
      });
    }, 5000);
    return () => clearInterval(intervalId);
  }, [animeList]);

  useEffect(() => {
    if (animeList.length === 7 && animeSlideID < animeList.length) {
      setNowShowing(animeList[animeSlideID]);
    }
  }, [animeSlideID, animeList]);

  if (fetchingError) return <Error />;

  return (
    <header className="Hfooter h-[400px] flex flex-col justify-between relative md:h-screen ">
      <FetchHeader
        setAnimeList={setAnimeList}
        setFetchingError={setFetchingError}
      />
      <FetchContinuedAnime setContinueWatch={setContinueWatch} />
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
