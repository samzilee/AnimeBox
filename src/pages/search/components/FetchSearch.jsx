import React, { useEffect } from "react";

const FetchSearch = ({ searchText, setResult, setLoading, search }) => {
  const FetchAnime = async () => {
    const url =
      searchText === ""
        ? "https://animerunway2-0.vercel.app/aniwatch/most-popular"
        : `https://animerunway2-0.vercel.app/aniwatch/search?keyword=${searchText}`;
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
