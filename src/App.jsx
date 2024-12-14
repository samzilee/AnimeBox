import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Main from "./pages/ma-in/Main";
import ErrorPath from "./pages/error-page/ErrorPath";
import AboutAnime from "./pages/AboutAnime/AboutAnime";
import WatchAnime from "./pages/watchAnime/WatchAnime";
import MainSearch from "./pages/search/MainSearch";
import SeeAll from "./pages/seeAll/SeeAll";

const App = () => {
  const Routs = createHashRouter([
    {
      element: <Main />,
      path: "/",
      errorElement: <ErrorPath />,
    },
    {
      element: <AboutAnime />,
      path: "/:animeTitle",
    },
    {
      element: <WatchAnime />,
      path: "/watching/:episode",
    },
    {
      element: <MainSearch />,
      path: "/search",
    },
    {
      element: <SeeAll />,
      path: "/see-all/:value",
    },
  ]);

  return (
    <>
      <RouterProvider router={Routs}></RouterProvider>
    </>
  );
};
export default App;
