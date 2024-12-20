import React, { useState } from "react";
import FetchUpcomingAnime from "./FetchUpcomingAnime";
import Loader from "../../../../../Loader";
import MapUpcoming from "./MapUpcoming";

const Upcoming = () => {
  const [upcomingAnime, setUpcomingAnime] = useState([]);

  return (
    <div>
      <FetchUpcomingAnime setUpcomingAnime={setUpcomingAnime} />
      <MapUpcoming upcomingAnime={upcomingAnime} />
    </div>
  );
};

export default Upcoming;
