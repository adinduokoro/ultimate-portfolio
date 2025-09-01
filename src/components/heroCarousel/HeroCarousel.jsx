import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./HeroCarousel.module.css";

gsap.registerPlugin(ScrollTrigger);

const HeroCarousel = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  // const [activeIndex, setActiveIndex] = useState(0);
  const lastIndexRef = useRef(0);

useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;

      // panels inside the track
      const panels = gsap.utils.toArray(":scope > section", track);
      const count = panels.length;


      gsap.to(track, {
        xPercent: -100 * (count - 1),
        ease: "none",
        scrollTrigger: {
          id: "carousel",
          trigger: container,
          pin: true,
          scrub: 1,
          markers: true,
          end: () => "+=" + (track.scrollWidth - container.clientWidth),
          snap: {
            snapTo: 1 / (count - 1),
            duration: 0.35,
            ease: "power1.out",
          },
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (count - 1));
            if (idx !== lastIndexRef.current) {
              lastIndexRef.current = idx;
              // setActiveIndex(idx);
            }
          },
        },
      });
      // cleanup is automatic with useGSAP
    },
    { scope: containerRef } // scopes GSAP selectors and animations
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.track} ref={trackRef}>
        {/* 5 full-viewport panels (add more if needed) */}
        <section className={`${styles.panel} ${styles.a}`}>1</section>
        <section className={`${styles.panel} ${styles.b}`}>2</section>
        <section className={`${styles.panel} ${styles.c}`}>3</section>
        <section className={`${styles.panel} ${styles.d}`}>4</section>
        <section className={`${styles.panel} ${styles.e}`}>5</section>
      </div>
      {/* Simple progress / index UI (optional) */}
      {/* <div className="hc-indicator">Section {activeIndex + 1} / 5</div> */}
    </div>
  );
};

export default HeroCarousel;
