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
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    FetchAnime();
  }, [searchText]);

  return <></>;
};

export default FetchSearch;
