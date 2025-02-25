import React from "react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <p>hi i am home</p>
      <br />
      <Link to={"/createGroup"}>
        <button className="btn bg-amber-500 p-3 rounded-2xl">
          create a group
        </button>
      </Link>
      <br />
      <Link to={'/groupInfo'}>
        <button className="btn bg-amber-500 p-3 rounded-2xl">
          go to your team
        </button>
      </Link>
    </div>
  );
};

export default Home;
