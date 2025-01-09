import React, { useState } from "react";
import SearchHeader from "./components/SearchHeader";
import FetchSearch from "./components/FetchSearch";
import MainBodySearch from "./components/MainBodySearch";
import { useLocation } from "react-router-dom";
import "./search.css";

const MainSearch = () => {
  const path = useLocation().pathname;
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  localStorage.setItem("prevPath", path);

  return (
    <main>
      <SearchHeader
        searchText={searchText}
        setSearchText={setSearchText}
        setSearch={setSearch}
      />
      <FetchSearch
        searchText={searchText}
        search={search}
        setResult={setResult}
        setLoading={setLoading}
      />
      <MainBodySearch result={result} loading={loading} />
    </main>
  );
};

export default MainSearch;
