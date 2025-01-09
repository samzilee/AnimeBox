import { Link } from "react-router-dom";
import Loader from "../../../Loader";
import { FiArrowLeft } from "react-icons/fi";
import VideoPlayer from "./VideoPlayer";

const AnimeVideo = ({ watching, changingEp, fetching }) => {
  const back = localStorage.getItem("AboutPath");
  if (!watching) return null;

  return (
    <main className="flex-1 relative ">
      {changingEp || fetching ? (
        <div className="h-[370px]">
          <Loader />
        </div>
      ) : (
        <div id="container">
          <VideoPlayer
            src={watching.sources[0].url}
            captions={watching.tracks.filter(
              (track) => track.kind !== "thumbnails"
            )}
            poster={
              watching.tracks.filter((track) => track.kind === "thumbnails")[0]
            }
          />
          <div className="text-center py-2 bg-gray-600 bg-opacity-[0.5] font-mono relative">
            <p className="text-[0.9rem]">
              You are watching{" "}
              <span className="text-blue-400">
                Episode {watching.aboutAnime.episodeNo}
              </span>
            </p>
            <p className="font-bold text-[0.8rem] text-gray-500">
              {" "}
              {watching.aboutAnime.name}
            </p>
            <p className=" absolute top-[5px] right-[5px] text-gray-400">
              {watching.type.slice(0, 1).toUpperCase() +
                watching.type.slice(1, 3)}
            </p>
          </div>
        </div>
      )}

      <Link to={back || "/"} className="absolute top-0 z-10 mt-2 ml-1 ">
        <FiArrowLeft className="text-[1.7rem]" />
      </Link>
    </main>
  );
};

export default AnimeVideo;
