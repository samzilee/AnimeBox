import React, { useEffect, useState } from "react";

const FetchHeader = ({ setAnimeList, setFetchingError }) => {
  const FetchingSpotLightAnimes = async () => {
    try {
      const respons = await fetch(
        `https://animerunway2-0.vercel.app/aniwatch/`
      );
      const data = await respons.json();
      fetchSpotLightInfo(data.spotLightAnimes);
    } catch (err) {
      setFetchingError(true);
      console.log(err);
    }
  };

  const fetchSpotLightInfo = (spotLightAnimes) => {
    spotLightAnimes.map(async (anime) => {
      try {
        const respons = await fetch(
          `https://animerunway2-0.vercel.app/aniwatch/anime/${anime.id}`
        );
        const data = await respons.json();
        setAnimeList((current) => {
          //checking for duplicate
          const checkForDuplicate = current.filter(
            (anime) => anime.info.id === data.info.id
          );

          //if duplicate is found returning the current value
          if (checkForDuplicate.length > 0) return [...current];

          if (current.length === 10) return current;
          return [...current, data];
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    FetchingSpotLightAnimes();
  }, []);

  return <></>;
};

export default FetchHeader;
