import { BiPlus } from "react-icons/bi";
import { BsPlayCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const MapList = ({ animeList }) => {
  return (
    <main className="p-3">
      <ul className="flex flex-col gap-4 md:flex-row md:flex-wrap justify-center">
        {animeList.map((anime) => {
          return (
            <div key={anime.id}>
              <li
                key={anime.id}
                className=" flex gap-4 md:flex-col  md:w-[150px] "
              >
                <div className="max-w-[100px] min-w-[100px] md:max-w-[140px] md:min-w-[130px] flex relative md:h-[200px] h-[140px]">
                  <img
                    src={anime.image}
                    alt={anime.title}
                    className="size-full rounded-lg AnimeList"
                  />

                  <Link
                    to={`/${anime.id}`}
                    className="absolute  w-full h-full top-0 flex justify-center items-center cursor-pointer"
                  >
                    <div className="bg-gray-400 p-1 rounded-full">
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

                    <div className="md:flex items-center gap-1">
                      <p className="text-[0.8rem] font-semibold text-gray-300">
                        Duration: <span>{anime.duration}</span>
                      </p>

                      <p className="text-[0.7rem] text-blue-400 ">
                        type: <span>{anime.type}</span>
                      </p>

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
                    </div>
                  </div>

                  <div className=" flex items-end mb-5 w-fit">
                    <button
                      className="border-[1.4px]
                     opacity-[0.5] cursor-not-allowed
                    flex items-center text-[0.8rem] font-bold pr-4 px-2 py-1 rounded-full "
                    >
                      <BiPlus className="text-[1.2rem]" />
                      My List
                    </button>
                  </div>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </main>
  );
};

export default MapList;
