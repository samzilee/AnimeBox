import { useState } from "react";
import { BiCaptions, BiPlus, BiSolidMicrophone } from "react-icons/bi";
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
      const myList = JSON.parse(localStorage.getItem("myList2"));
      if (!myList) return;
      let newList = myList.filter((anime) => anime.anime_id !== id);
      localStorage.setItem("myList2", JSON.stringify(newList));
      return setAnimeList(() => {
        if (!newList[0]) return ["N/V"];
        return newList;
      });
    }
  };

  if (animeList[0] === "N/V")
    return (
      <div className="pt-2 text-gray-400 text-center">
        <p>Saved Anime Will Be Displayed Here</p>
      </div>
    );

  if (!animeList[0]) return;

  return (
    <main className="p-3">
      <ul className="flex flex-col gap-4 md:flex-row md:flex-wrap justify-center">
        {animeList.map((anime, index) => {
          return (
            <li key={index}>
              <div className=" flex gap-4 md:flex-col   ">
                <div className="flex relative h-[200px] w-[160px]">
                  <img
                    src={anime.img}
                    alt={anime.name}
                    className="size-full rounded-lg AnimeList object-cover "
                  />
                  <p className="text-[0.7rem] absolute  bg-red-400 right-0 mr-1 mt-1 px-1 rounded-sm">
                    <span>{anime.rated ? "18+" : ""}</span>
                  </p>

                  <Link
                    to={`/${anime.id}`}
                    className="absolute w-full h-full flex justify-center items-center cursor-pointer rla"
                  >
                    <div className="bg-gray-400 p-1 rounded-full ">
                      <BsPlayCircleFill />
                    </div>
                  </Link>
                </div>

                <div className=" flex-1 flex flex-col justify-between  ">
                  <div className="flex flex-col">
                    <p className="font-semibold text-[1.1rem] md:text-[0.8rem]">{`${
                      anime.name.length > 20
                        ? anime.name.slice(0, 20) + "..."
                        : anime.name
                    }`}</p>

                    <div className="flex flex-col  gap-1 ">
                      {anime.duration === "m" ? (
                        <p className="text-[0.8rem] font-semibold text-gray-300">
                          Duration: <span>N/A</span>
                        </p>
                      ) : (
                        <p className="text-[0.8rem] font-semibold text-gray-300">
                          Duration: <span>{anime.duration}</span>
                        </p>
                      )}

                      <div className="flex gap-1 text-[0.8rem]  text-black">
                        <div className="flex items-center bg-[#b0e3af] px-2 font-bold rounded-l">
                          <div>
                            <BiCaptions />
                          </div>
                          <p className="">{anime.episodes.sub || "N/A"}</p>
                        </div>

                        <div
                          className="
                        flex items-center  px-2 font-bold  bg-[#e3b5cd] "
                        >
                          <div>
                            <BiSolidMicrophone />
                          </div>
                          <p className="">{anime.episodes.dub || "N/A"}</p>
                        </div>

                        <div
                          className="
                          px-2 font-bold  bg-gray-400 rounded-r"
                        >
                          <p className="">{anime.episodes.eps || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" flex items-start mt-5 w-fit  h-full">
                    {anime.anime_id ? (
                      <button
                        className="border-[1.4px]
                    opacity-[0.5] hover:opacity-[1] cursor-pointer
                  flex items-center text-[0.8rem] font-bold pr-4 px-2 py-1 rounded-full text-red-500 border-red-500 relative"
                        onClick={() => removeFromList(anime.anime_id)}
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
                        Remove
                      </button>
                    ) : (
                      ""
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
