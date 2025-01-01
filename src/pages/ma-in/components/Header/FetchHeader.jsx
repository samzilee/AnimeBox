import React, { useEffect, useState } from "react";

const FetchHeader = ({ setAnimeList, setFetchingError }) => {
  const FetchingInfo = async () => {
    try {
      const respons = await fetch(`https://api.jikan.moe/v4/top/anime`);
      const data = await respons.json();
      setAnimeList(data.data.slice(0, 7));
    } catch (err) {
      setFetchingError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    FetchingInfo();
  }, []);

  return <></>;
};

export default FetchHeader;
