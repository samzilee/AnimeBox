import React, { useEffect, useState } from "react";
import Loader from "../../../../Loader";
const BackGround = ({ NowShowing }) => {
  const [move, setMove] = useState(false);
  useEffect(() => {
    if (!NowShowing) return;
    setMove(true);
    const TimeOut = setTimeout(() => {
      setMove(false);
    }, 500);
    return () => clearTimeout(TimeOut);
  }, [NowShowing]);

  if (!NowShowing)
    return (
      <div className="z-[-1]">
        <Loader />
      </div>
    );

  return (
    <div
      id="slide"
      className={`absolute left-0 right-0 bottom-[2px] top-0 z-[-1] filter brightness-[0.6] transition-all duration-[0.5s]   ${
        move === true ? "scale-[0.9] filter brightness-[0.4]" : ""
      }`}
    >
      <img
        src={NowShowing.info.img}
        alt={NowShowing.info.name || NowShowing.moreInfo.Japanese}
        className="size-full object-cover"
      />
    </div>
  );
};

export default BackGround;
