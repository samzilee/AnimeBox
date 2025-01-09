import React, { useEffect } from "react";

const FetchContinuedAnime = ({ setContinueWatch }) => {
  const continueWatching = JSON.parse(
    localStorage.getItem("continueWatching2")
  );

  const fetchAnime = async (animeId, episodeId, episodeNo) => {
    const url = `https://animerunway2-0.vercel.app/aniwatch/anime/${animeId}`;
    try {
      const respones = await fetch(url);
      const data = await respones.json();
      setContinueWatch(() => {
        return {
          animeData: data.info,
          episodeId: episodeId,
          ...continueWatching,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!continueWatching) return;

    const animeId = continueWatching.episodeId.split("?")[0];
    fetchAnime(animeId);
  }, []);

  return <></>;
};

export default FetchContinuedAnime;
