import React from "react";
import { HeroCarousel } from "../components";
import { HeroCanvas } from "../components";

const Home = () => {
  return (
    <div style={{ height: '100vh', width: '100%', backgroundColor: 'black' }}>
      <HeroCanvas /> {/* working on the 3d animation canvas */}
      {/* <HeroCarousel /> */}
    </div>
  );
};

export default Home;

