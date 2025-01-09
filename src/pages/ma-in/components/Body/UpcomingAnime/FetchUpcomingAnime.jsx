import React, { useEffect } from "react";

const FetchUpcomingAnime = ({ setUpcomingAnime, page, setFetching }) => {
  const fetchUpcoming = async () => {
    setFetching(true);
    const url = `https://animerunway2-0.vercel.app/aniwatch/top-upcoming?page=${page}`;
    try {
      const respons = await fetch(url);
      const data = await respons.json();
      setUpcomingAnime(data);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUpcoming();
  }, [page]);

  return <></>;
};

export default FetchUpcomingAnime;
