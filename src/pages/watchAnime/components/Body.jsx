import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FiAlertCircle, FiAlertTriangle } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const Body = ({
  servers,
  watching,
  setServerName,
  setType,
  showServer,
  setShowServer,
}) => {
  const path = useLocation().pathname;
  const ep = path.split("-episode-");
  const animeName = ep[0].toString();

  const [epInput, setEpInput] = useState("");
  const [episodes, setEPisodes] = useState([]);
  const [closeMenuPc, setColseMenuPc] = useState(false);

  const epPlaying = document.getElementById(ep[1]);
  if (epPlaying !== null) {
    episodes.map((episode) => {
      const notClikedBtn = document.getElementById(episode.number);
      if (notClikedBtn !== null) {
        notClikedBtn.style.backgroundColor = "transparent";
        notClikedBtn.style.color = "rgb(96, 165, 250)";
        epPlaying.style.backgroundColor = "rgb(96, 165, 250)";
        epPlaying.style.color = "white";
      }
    });
    epPlaying.style.backgroundColor = "rgb(96, 165, 250)";
    epPlaying.style.color = "white";
  }

  useEffect(() => {
    if (!servers) return;
    if (!servers.Totalep) return;
    setEPisodes(() => {
      if (epInput === "") return servers.Totalep;
      return servers.Totalep.filter(
        (episode) => episode.number === parseInt(epInput)
      );
    });
  }, [epInput, servers]);

  if (!servers) return;
  if (!watching) return;

  return (
    <main
      className={`flex-1 transition-all duration-[0.5s]  overflow-hidden ${
        closeMenuPc ? " w-0 flex-none" : ""
      }`}
    >
      <header>
        <div className="text-center bg-gray-700 bg-opacity-[0.3] text-[0.9rem] py-1 relative">
          <p>
            You are watching{" "}
            <span className="text-blue-300">Episode {ep[1]}</span>
          </p>
          <div
            className={` fixed right-0 top-0 pt-1 pr-2 text-[1.3rem] hidden md:block ${
              closeMenuPc ? "text-green-500" : "text-red-500"
            }`}
          >
            <CgClose
              className="size-full cursor-pointer"
              onClick={() => {
                if (closeMenuPc) return setColseMenuPc(false);
                setColseMenuPc(true);
              }}
            />
          </div>
        </div>

        <div className="flex gap-4 px-5 pt-5 pb-1">
          <button
            className="px-3 rounded-full bg-blue-400 py-[0.5px]"
            onClick={() => {
              setShowServer((current) => {
                if (current === true) return false;
                return true;
              });
            }}
          >
            Servers
          </button>
          {!watching.server[0].name ? (
            ""
          ) : (
            <p className="text-[0.8rem] text-gray-400">
              {watching.server[0].name}{" "}
              <span className="font-bold">{watching.type}</span>
            </p>
          )}
        </div>
      </header>

      <main>
        <div
          className={`p-2  pl-5 flex flex-col gap-3 transition-all duration-[0.5s] ${
            showServer
              ? "h-[100%]"
              : "translate-x-[100%] overflow-hidden opacity-0 h-0"
          }`}
        >
          <div className="flex gap-2">
            <p className="font-bold">Sub:</p>
            <ul className="flex flex-wrap gap-3">
              {!servers.sub || servers.sub.message ? (
                <FiAlertCircle className="text-red-500  items-center" />
              ) : (
                servers.sub.map((server) => {
                  return (
                    <button
                      key={server.name}
                      className="border-[1.5px] border-blue-400 text-blue-400 px-2 py-1 rounded-full cursor-pointer hover:border-blue-200 text-[0.8rem] hover:text-blue-200 transition-all duration-[0.5s]"
                      onClick={() => {
                        setServerName(server.name);
                        setType("sub");
                      }}
                    >
                      {server.name}
                    </button>
                  );
                })
              )}
            </ul>
          </div>
          <div className="flex gap-2">
            <p className="font-bold">Dub:</p>
            <ul className="flex flex-wrap gap-3 items-center">
              {!servers.dub || servers.dub.message ? (
                <FiAlertCircle className="text-red-500 " />
              ) : (
                servers.dub.map((server) => {
                  return (
                    <button
                      key={server.name}
                      className="border-[1.5px] border-blue-400 text-blue-400 px-2 py-1 rounded-full cursor-pointer hover:border-blue-200 text-[0.8rem] hover:text-blue-200 transition-all duration-[0.5s]"
                      onClick={() => {
                        setServerName(server.name);
                        setType("dub");
                      }}
                    >
                      {server.name}
                    </button>
                  );
                })
              )}
            </ul>
          </div>
        </div>
        <div>
          <div className="flex justify-end px-6 py-2 ">
            <div className="flex items-center px-2 py-1 rounded-xl bg-gray-400 bg-opacity-[0.2] ">
              <BiSearch className="text-[1.5rem]" />
              <input
                type="number"
                placeholder="Search Ep"
                className="px-1 w-[150px] bg-transparent outline-none"
                value={epInput}
                onChange={(e) => setEpInput(e.target.value)}
              />
            </div>
          </div>

          <div className=" bg-gray-600 bg-opacity-[0.2] flex p-5">
            <ul className="All flex flex-wrap gap-2 max-h-[250px] overflow-y-scroll  pl-[4%] w-fit">
              {episodes.map((episode) => {
                return (
                  <Link
                    to={`${animeName}-episode-${episode.number}`}
                    key={episode.id}
                    id={episode.number}
                    className=" w-10 flex items-center justify-center text-[0.8rem] font-bold h-7 border-[1.5px] 
                    text-blue-400 border-blue-400 rounded-sm hover:border-blue-300 hover:text-blue-300"
                  >
                    <p>{episode.number}</p>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </main>
  );
};

export default Body;
