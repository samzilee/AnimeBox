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
        <div className="h-[290px]">
          <Loader />
        </div>
      ) : (
        <div id="container" className="h-[290px] relative">
          <VideoPlayer
            src={watching.sources[0].url}
            captions={watching.tracks.filter(
              (track) => track.kind !== "thumbnails"
            )}
            poster={
              watching.tracks.filter((track) => track.kind === "thumbnails")[0]
            }
          />
        </div>
      )}

      <Link to={back || "/"} className="absolute top-0 z-10 mt-2 ml-1 ">
        <FiArrowLeft className="text-[1.7rem]" />
      </Link>
    </main>
  );
};

export default AnimeVideo;
