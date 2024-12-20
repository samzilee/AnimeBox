import React, { useEffect } from "react";

const FetchContinuedAnime = ({ setContinueWatch }) => {
  const continueWatching = localStorage.getItem("continueWatching");
  if (!continueWatching) return;
  const AnimeFragment = continueWatching.slice(10).split("-episode-");

  const fetchAnime = async () => {
    const url = `https://animerunway.vercel.app/anime/gogoanime/${AnimeFragment[0]}`;

    try {
      const respones = await fetch(url);
      const data = await respones.json();
      setContinueWatch(data.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  return <></>;
};

export default FetchContinuedAnime;
