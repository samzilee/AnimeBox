import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FetchEpisodes = ({ setAnimeId, setAvailableEp, setFetching }) => {
  const animeId = useLocation().pathname;

  const fetchEplist = async () => {
    const url = `https://animerunway2-0.vercel.app/aniwatch/episodes${animeId}`;
    try {
      const respons = await fetch(url);
      const data = await respons.json();

      setAnimeId(data.episodes.filter((ep) => ep.episodeNo === 1)[0].episodeId);

      setAvailableEp(data.episodes);

      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchEplist();
  }, [animeId]);

  return <div></div>;
};

export default FetchEpisodes;
