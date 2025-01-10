import React, { useState } from "react";
import FetchUpcomingAnime from "./FetchUpcomingAnime";
import Loader from "../../../../../Loader";
import MapUpcoming from "./MapUpcoming";
import Pagination from "./Pagination";

const Upcoming = () => {
  const [upcomingAnime, setUpcomingAnime] = useState({});
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  return (
    <div className={`relative ${fetching ? "h-40" : "h-fit"}`}>
      <FetchUpcomingAnime
        setUpcomingAnime={setUpcomingAnime}
        page={page}
        setFetching={setFetching}
      />
      {fetching ? (
        <Loader />
      ) : (
        <>
          <MapUpcoming upcomingAnime={upcomingAnime} />
          <Pagination
            paginationData={{
              currentPage: upcomingAnime.currentPage,
              hasNextPage: upcomingAnime.hasNextPage,
              totalPages: upcomingAnime.totalPages,
            }}
            setPage={setPage}
            page={page}
          />
        </>
      )}
    </div>
  );
};

export default Upcoming;
