import React, { useEffect, useState } from "react";

const FetchHeader = ({
  animeId,
  setAnimeId,
  setAnimeList,
  setFetchingError,
}) => {
  const [gotData, setData] = useState(null);
  const url = "https://animerunway.vercel.app/anime/zoro/most-popular";

  useEffect(() => {
    setAnimeId(() => {
      if (!gotData || !gotData[4]) return;
      return [
        gotData[0].id,
        gotData[1].id,
        gotData[2].id,
        gotData[3].id,
        gotData[4].id,
      ];
    });
  }, [gotData]);

  const FetchingID = async () => {
    try {
      const respons = await fetch(url);
      const data = await respons.json();
      setData(Array.from(data.results.slice(0, 7)));
    } catch (err) {
      setFetchingError(true);
      console.log("Error");
    }
  };

  const FetchingInfo = () => {
    animeId.map(async (id) => {
      try {
        const respons = await fetch(
          `https://animerunway.vercel.app/anime/zoro/info?id=${id}`
        );
        const data = await respons.json();
        await setAnimeList((current) => {
          if (current.length >= 5) return current;
          return [...current, data];
        });
      } catch (err) {
        /* FetchingInfo(); */
        console.log("Error");
      }
    });
  };

  useEffect(() => {
    FetchingID();
  }, []);

  useEffect(() => {
    if (!gotData || animeId === null) return;
    FetchingInfo();
  }, [animeId]);

  return <></>;
};

export default FetchHeader;
