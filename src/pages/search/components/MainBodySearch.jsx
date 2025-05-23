import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../Loader";

const MainBodySearch = ({ result, loading }) => {
  if (loading.message)
    return (
      <div className="text-center font-semibold text-gray-500 mt-5">
        <p>{loading.message}</p>
      </div>
    );
  return (
    <main className="mt-5 pb-10 relative h-fit">
      {!result[0] ? (
        <Loader />
      ) : (
        <ul className="flex flex-wrap gap-5 justify-center ">
          {loading ? (
            <Loader />
          ) : (
            result.map((anime) => {
              return (
                <Link to={`/${anime.id}`} key={anime.id}>
                  <div className="bottomShadow w-[150px] h-[230px] relative">
                    <img
                      src={anime.img}
                      alt={anime.name}
                      className="size-full rounded-md AnimeList object-cover"
                    />
                    <p className="absolute bottom-0 left-0 right-0 text-[0.7rem] z-[2]">
                      {anime.name}
                    </p>
                    <div className=" absolute top-0 left-0 right-0 flex justify-between px-2 pt-2 font-semibold text-[0.7rem]">
                      {anime.rated ? (
                        <p className="bg-red-400 text-white px-2 rounded-md ">
                          18+
                        </p>
                      ) : (
                        <p className="bg-white text-black px-2 rounded-md ">
                          PG-13
                        </p>
                      )}
                      <p className="bg-blue-400 px-2 rounded-md text-center">
                        HD
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </ul>
      )}
    </main>
  );
};

export default MainBodySearch;
