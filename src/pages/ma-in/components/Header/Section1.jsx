import React from "react";
import logo from "../../../../Assets/large.png";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

const Section1 = () => {
  return (
    <header className="Hheader flex justify-between items-center pr-5">
      <section>
        <img src={logo} alt="Web-Logo" className="w-32" />
      </section>
      <section>
        <Link to="/search">
          <BiSearch className="text-white size-[2.2rem]" />
        </Link>
      </section>
    </header>
  );
};

export default Section1;
