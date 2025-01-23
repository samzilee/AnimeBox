import React, { useEffect, useRef, useState } from "react";
import FetchEp from "./FetchEp";
import AnimeVideo from "./components/AnimeVideo";
import Body from "./components/Body";
import Error from "../../Error";
import { useLocation } from "react-router-dom";
import Loader from "../../Loader";

const WatchAnime = () => {
  const [totalEp, setTotalEp] = useState([]);
  const [servers, setServers] = useState(null);
  const [watching, setWatching] = useState(null);
  const [selection, setSelection] = useState(null);

  const [type, setType] = useState("sub");
  const [serverName, setServerName] = useState("vidsrc");

  const [fetching, setFetching] = useState(true);
  const [changingEp, setChangingEP] = useState(true);
  const [error, setError] = useState(false);

  const [changeMode, setChangeMode] = useState(false);

  const mode = useRef(null);

  useEffect(() => {
    if (!servers) return;
    if (type === "sub") {
      const serverNameFilter = servers.sub.filter(
        (server) => server.serverName === serverName
      );
      if (!servers.sub[0]) return setType("dub");
      return setSelection(() => {
        return {
          type: "sub",
          serverName: serverNameFilter[0] || servers.sub[0],
          episodeId: servers.episodeId,
        };
      });
    } else if (type === "dub") {
      const serverNameFilter = servers.dub.filter(
        (server) => server.serverName === serverName
      );

      if (!servers.dub[0]) return setType("sub");
      return setSelection(() => {
        return {
          type: "dub",
          serverName: serverNameFilter[0] || servers.dub[0],
          episodeId: servers.episodeId,
        };
      });
    }
  }, [serverName, type, servers]);

  useEffect(() => {
    if (!totalEp || !servers) return;
    setWatching((current) => {
      const list = totalEp.filter((ep) => ep.episodeNo === servers.episodeNo);
      return {
        ...current,
        aboutAnime: list[0],
        type: type,
      };
    });
  }, [totalEp, servers, serverName, type]);

  useEffect(() => {
    if (mode.current) {
      const modeBg = mode.current;
      modeBg.addEventListener("click", () => {
        setChangeMode(false);
      });
    }
  }, [changeMode]);

  if (error) return <Error />;

  return (
    <main>
      <div
        ref={mode}
        className={`absolute w-full h-full  z-[100] bg-gray-700 bg-opacity-[0.8] flex justify-center items-center ${
          changeMode ? "visible" : "hidden"
        }`}
      >
        <main className="bg-gray-800 rounded-md w-full max-w-[360px] py-5 ">
          <h1 className="text-center font-bold mb-5">⚠ Notice</h1>

          <div className=" flex flex-col text-[0.8rem] mb-5 px-4 text-gray-400">
            <p>
              the video player contains ads provided by the streaming platform.
              These ads are not controlled by us.
            </p>
            <p>
              We appreciate your understanding and hope you enjoy watching your
              favorite anime! 🍥
            </p>
          </div>

          <div className="font-bold flex gap-4 justify-center">
            <button className="border-[1.5px] px-5 rounded-md bg-green-400 opacity-[0.5] pointer-events-none">
              Got it!
            </button>
            <button
              className="border-[1.5px] px-5 rounded-md bg-red-400"
              onClick={() => {
                setChangeMode(false);
              }}
            >
              Cancel
            </button>
          </div>
        </main>
      </div>
      <FetchEp
        setServers={setServers}
        setWatching={setWatching}
        setFetching={setFetching}
        setChangingEP={setChangingEP}
        setError={setError}
        setTotalEp={setTotalEp}
        selection={selection}
      />
      {fetching ? (
        <Loader />
      ) : (
        <div className="md:flex">
          <AnimeVideo
            watching={watching}
            changingEp={changingEp}
            fetching={fetching}
          />
          <Body
            selection={selection}
            watching={watching}
            totalEp={totalEp}
            servers={servers}
            setType={setType}
            setServerName={setServerName}
            changeMode={changeMode}
            setChangeMode={setChangeMode}
          />
        </div>
      )}
    </main>
  );
};

export default WatchAnime;
