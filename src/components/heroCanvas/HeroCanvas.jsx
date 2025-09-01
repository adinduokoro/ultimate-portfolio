import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // === Renderer ===
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current, // React ref instead of appendChild
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // === Scene ===

    // === Camera ===
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // === Animate loop ===
    const animate = () => {
      requestAnimationFrame(animate);
    };
    animate();

    // === Handle resize ===
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    //   geometry.dispose();
    //   material.dispose();
    //   renderer.dispose();
    // };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default HeroCanvas;
