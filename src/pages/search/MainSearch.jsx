import React, { useEffect, useState } from "react";
import SearchHeader from "./components/SearchHeader";
import FetchSearch from "./components/FetchSearch";
import MainBodySearch from "./components/MainBodySearch";
import { useLocation } from "react-router-dom";
import "./search.css";

const MainSearch = () => {
  const path = useLocation().pathname + useLocation().search;
  const searching = useLocation().search;
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchText(searching.slice(1).split("%20").join(" ") || "");
    localStorage.setItem("prevPath", path);
  }, [path]);

  return (
    <main>
      <SearchHeader searchText={searchText} setSearchText={setSearchText} />
      <FetchSearch setResult={setResult} setLoading={setLoading} />
      <MainBodySearch result={result} loading={loading} />
    </main>
  );
};

export default MainSearch;
