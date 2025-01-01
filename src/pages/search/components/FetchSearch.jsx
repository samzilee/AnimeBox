import React, { useEffect } from "react";

const FetchSearch = ({ searchText, setResult, setLoading }) => {
  const FetchAnime = async () => {
    const url =
      searchText === ""
        ? "https://animerunway.vercel.app/anime/zoro/most-popular"
        : `https://animerunway.vercel.app/anime/zoro/${searchText}`;
    setLoading(true);
    try {
      const respons = await fetch(url);
      let data = await respons.json();
      data = data.results;
      setResult(data);
      setLoading(false);
      if (!data[0]) {
        return setLoading({ message: "Anime Not Found 😢" });
      }
    } catch (err) {
      setLoading({ message: "Error: please Check Your Connection." });
      console.log(err);
    }
  };
  useEffect(() => {
    FetchAnime();
  }, [searchText]);

  return <></>;
};

export default FetchSearch;
