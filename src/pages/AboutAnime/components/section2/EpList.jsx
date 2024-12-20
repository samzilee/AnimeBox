import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsPlayCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const EpList = ({ animeData, animeId, availableEp }) => {
  const [FindEp, setFindEp] = useState("");
  const [episodes, setEPisodes] = useState([]);
  const [searchEp, setSearchEp] = useState([]);
  const [sliceEp, setSliceEp] = useState([]);

  useEffect(() => {
    if (animeData === null) return;
    setSliceEp(() => {
      return [...availableEp];
    });
  }, [availableEp]);

  useEffect(() => {
    if (!sliceEp) return;
    const slice = sliceEp.slice(0, 50);
    setEPisodes(slice);
  }, [sliceEp]);

  useEffect(() => {
    setSearchEp(() => {
      return episodes.filter((ep) => ep.number === +FindEp);
    });
  }, [FindEp]);

  useEffect(() => {
    if (FindEp === "") {
      return setSearchEp(episodes);
    }
  }, [episodes, FindEp]);

  return (
    <main className="">
      <section className="flex justify-between items-center px-5">
        <p className="font-bold">Episodes</p>
        {availableEp.length > 50 ? (
          <marquee className="mx-2 text-red-400">
            Only {episodes.length} Episodes Are Shown Here
          </marquee>
        ) : (
          ""
        )}

        <div className="flex gap-2 border items-center px-5 py-2 rounded-lg max-w-[150px] md:max-w-[500px]">
          <label htmlFor="epInput">
            <BiSearch className="text-[1.3rem]" />
          </label>
          <input
            type="number"
            id="epInput"
            placeholder="Search episode"
            className="w-full bg-transparent outline-none"
            value={FindEp}
            onChange={(e) => setFindEp(e.target.value)}
          />
        </div>
      </section>
      <section className="Allside w-full overflow-x-scroll mt-5 px-5 ">
        <ul className="flex items-center gap-3">
          {!availableEp[0] ? (
            <p className="text-red-400">Anime Not Available Right Now</p>
          ) : (
            searchEp.map((ep, index) => {
              if (ep.number === 0) return;
              return (
                <li
                  key={index}
                  className="bottomShadow flex-shrink-0 h-fit relative"
                >
                  <img
                    src={animeData.images.jpg.large_image_url}
                    className="w-[120px] md:w-[120px] rounded-md h-[100px] object-cover"
                    alt={`episode ${ep}`}
                  />
                  <Link
                    to={`/watching/${ep.id}`}
                    className="absolute  w-full h-full top-0 flex justify-center items-center cursor-pointer z-10"
                  >
                    <div className="bg-gray-400 p-1 rounded-full">
                      <BsPlayCircleFill />
                    </div>
                  </Link>
                  <p className="absolute bottom-0 text-[0.8rem] pl-2 z-[2] ">
                    Episode {ep.number}
                  </p>
                </li>
              );
            })
          )}
        </ul>
      </section>
    </main>
  );
};

export default EpList;
