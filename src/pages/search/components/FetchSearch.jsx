import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FetchSearch = ({ setResult, setLoading }) => {
  const search = useLocation().search;

  const FetchAnime = async () => {
    const url =
      !search || search === "?"
        ? "https://animerunway2-0.vercel.app/aniwatch/most-popular"
        : `https://animerunway2-0.vercel.app/aniwatch/search?keyword=${search}`;
    setLoading(true);
    try {
      const respons = await fetch(url);
      let data = await respons.json();
      setResult(data.animes);
      setLoading(false);

      if (!data.animes[0]) {
        return setLoading({ message: "Anime Not Found 😢" });
      }
    } catch (err) {
      setLoading({ message: "Error: please Check Your Connection." });
      console.log(err);
    }
  };
  useEffect(() => {
    FetchAnime();
  }, [search]);

  return <></>;
};

export default FetchSearch;
