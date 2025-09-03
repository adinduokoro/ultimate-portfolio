// HeroCarousel.jsx
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./HeroCarousel.module.css";
gsap.registerPlugin(ScrollTrigger);

export default function HeroCarousel() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    const track = trackRef.current;
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
        // markers: true,
        end: () => "+=" + (track.scrollWidth - container.clientWidth),
        snap: {
          snapTo: 1 / (count - 1),
          duration: 0.5,
          ease: "power1.out",
        },
        onUpdate: (self) => {
          // broadcast live progress + panel count (for mapping to spins)
          window.dispatchEvent(
            new CustomEvent("carousel:progress", {
              detail: { progress: self.progress, panels: count, velocity: self.getVelocity() }
            })
          );
        },
      },
    });
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.track} ref={trackRef}>
        <section className={`${styles.panel} ${styles.a}`}>1</section>
        <section className={`${styles.panel} ${styles.b}`}>2</section>
        <section className={`${styles.panel} ${styles.c}`}>3</section>
        <section className={`${styles.panel} ${styles.d}`}>4</section>
        <section className={`${styles.panel} ${styles.e}`}>5</section>
      </div>
    </div>
  );
}
