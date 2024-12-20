import React, { useEffect } from "react";

const FetchUpcomingAnime = ({ setUpcomingAnime }) => {
  const fetchUpcoming = async () => {
    const url = "https://api.jikan.moe/v4/seasons/upcoming";

    try {
      const respons = await fetch(url);
      const data = await respons.json();
      setUpcomingAnime(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUpcoming();
  }, []);

  return <></>;
};

export default FetchUpcomingAnime;
