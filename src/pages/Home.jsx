import React from "react";
import { HeroCarousel } from "../components";
import { HeroCanvas } from "../components";

const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: "5",
        }}
      >
        <HeroCanvas />
      </div>
      <HeroCarousel />
    </div>
  );
};

export default Home;
