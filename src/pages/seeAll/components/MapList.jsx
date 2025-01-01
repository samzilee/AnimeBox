import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { BsPlayCircleFill } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { Link } from "react-router-dom";

const MapList = ({ animeList, setAnimeList }) => {
  const [removeBtnClicked, setRemoveBtnCliked] = useState(1);

  const removeFromList = (id) => {
    setRemoveBtnCliked((current) => {
      return current + 1;
    });
    if (removeBtnClicked === 2) {
      setRemoveBtnCliked(1);
      const myList = JSON.parse(localStorage.getItem("myList"));
      if (!myList) return;
      let newList = myList.filter((anime) => anime.mal_id !== id);
      localStorage.setItem("myList", JSON.stringify(newList));
      return setAnimeList(() => {
        if (!newList[0]) return ["N/V"];
        return newList;
      });
    }
  };

  if (animeList[0] === "N/V")
    return (
      <div className="pt-2 text-gray-400 text-center">
        <p>Saved Anime Will Displayed Here</p>
      </div>
    );

  return (
    <main className="p-3">
      <ul className="flex flex-col gap-4 md:flex-row md:flex-wrap justify-center">
        {animeList.map((anime) => {
          return (
            <li key={anime.id || anime.mal_id}>
              <div className=" flex gap-4 md:flex-col  md:w-[150px] ">
                <div className="max-w-[140px] min-w-[140px] md:max-w-[140px] md:min-w-[130px] flex relative md:h-[200px] h-[180px]">
                  <img
                    src={anime.image || anime.images.jpg.image_url}
                    alt={anime.title}
                    className="size-full rounded-lg AnimeList object-cover "
                  />

                  <Link
                    to={`/${anime.id || anime.title.split("/").join(" ")}`}
                    className="absolute  w-full h-full top-0 flex justify-center items-center cursor-pointer"
                  >
                    <div className="bg-gray-400 p-1 rounded-full ">
                      <BsPlayCircleFill />
                    </div>
                  </Link>
                </div>

                <div className=" flex-1 flex flex-col justify-between  ">
                  <div className="flex flex-col">
                    <p className="font-semibold text-[1.1rem] md:hidden">{`${
                      anime.title.length > 20
                        ? anime.title.slice(0, 20) + "..."
                        : anime.title
                    }`}</p>
                    <p className="font-semibold text-[1.1rem] hidden md:block">
                      {`${
                        anime.title.length > 15
                          ? anime.title.slice(0, 15) + "..."
                          : anime.title
                      }`}
                    </p>

                    <div className="md:flex items-center gap-1 text-blue-400">
                      <p className="text-[0.8rem] font-semibold text-gray-300">
                        Duration: <span>{anime.duration}</span>
                      </p>

                      <p className="text-[0.7rem]  ">
                        type: <span>{anime.type}</span>
                      </p>
                      {anime.dub || anime.sub ? (
                        <div className="flex gap-1 text-[0.6rem]">
                          <p>
                            Sub:{" "}
                            <span className="text-gray-200">{anime.sub}</span>
                          </p>
                          <p>
                            Dub:{" "}
                            <span className="text-gray-200">{anime.dub}</span>
                          </p>
                        </div>
                      ) : (
                        <ul className="flex gap-1 text-[0.7rem] ">
                          [
                          {anime.genres.map((genre) => {
                            return <li key={genre.mal_id}>{genre.name}</li>;
                          })}
                          ]
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className=" flex items-start mt-5 w-fit  h-full">
                    {anime.mal_id ? (
                      <button
                        className="border-[1.4px]
                    opacity-[0.5] hover:opacity-[1] cursor-pointer
                  flex items-center text-[0.8rem] font-bold pr-4 px-2 py-1 rounded-full text-red-500 border-red-500 relative"
                        onClick={() => removeFromList(anime.mal_id)}
                      >
                        {" "}
                        <p
                          className={` absolute  right-0 bottom-[-30px] text-gray-100 px-2 py-[0.9px] bg-gray-600 rounded-md pointer-events-none transition-all duration-[0.5s] ${
                            removeBtnClicked === 1
                              ? "opacity-[0]"
                              : "opacity-[1]"
                          } `}
                        >
                          Click Again
                        </p>
                        <FcCancel className="text-[1.2rem]" />
                        Remove From List
                      </button>
                    ) : (
                      <button
                        className="border-[1.4px]
                   opacity-[0.5] cursor-not-allowed
                  flex items-center text-[0.8rem] font-bold pr-4 px-2 py-1 rounded-full "
                      >
                        <BiPlus className="text-[1.2rem]" />
                        My List
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default MapList;
