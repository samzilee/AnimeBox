import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FetchList from "./FetchList";
import MapList from "./components/MapList";
import { FiArrowLeft } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import Loader from "../../Loader";
import Error from "../../Error";

const SeeAll = () => {
  const path = useLocation().pathname;
  let type = path.slice(9);
  const [animeList, setAnimeList] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  if (error) return <Error />;
  localStorage.setItem("prevPath", path);

  return (
    <main id="SeeAllMain">
      <header className="p-2 flex justify-between items-center sticky top-0 z-50 bg-gray-800">
        <section className="flex items-center gap-5 ">
          <Link to="/">
            <FiArrowLeft className="text-[1.5rem] cursor-pointer" />
          </Link>
          <p className="text-[1.3rem] font-semibold">{type.toUpperCase()}</p>
        </section>
        {type === "my-List" ? (
          <section>
            <Link to="/search">
              <BiSearch className="text-[1.9rem]" />
            </Link>
          </section>
        ) : (
          <section className="flex gap-2">
            <Link to="/search">
              <BiSearch className="text-[1.9rem]" />
            </Link>

            <p className="border-[2px] rounded-md border-blue-400 text-blue-200">
              {page === 1 ? "" : page}
            </p>
            <button
              className="border-[2px] px-3 rounded-md border-blue-400 text-blue-400"
              onClick={() => {
                if (page === 1) return;
                setPage((current) => {
                  return current - 1;
                });
              }}
            >
              Back
            </button>
            <button
              className="border-[2px] px-3 rounded-md border-blue-400 text-blue-400"
              onClick={() => {
                if (!hasNextPage) return;
                setPage((current) => {
                  return current + 1;
                });
              }}
            >
              Next
            </button>

            <p className="border-[2px] rounded-md border-blue-400 text-blue-200">
              {hasNextPage ? page + 1 : ""}
            </p>
          </section>
        )}
      </header>

      <FetchList
        type={type}
        setAnimeList={setAnimeList}
        setError={setError}
        page={page}
        setHasNextPage={setHasNextPage}
        setFetching={setFetching}
      />

      {fetching ? (
        <Loader />
      ) : (
        <MapList animeList={animeList} setAnimeList={setAnimeList} />
      )}
    </main>
  );
};

export default SeeAll;
