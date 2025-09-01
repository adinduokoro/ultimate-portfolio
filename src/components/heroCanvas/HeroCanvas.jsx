import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import styles from './HeroCanvas.module.css'

const HeroCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      // === Scene ===
      const scene = new THREE.Scene();
  
      // === Camera ===
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.z = 3;
  
      // === Renderer ===
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true, // transparent background
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
  
      // === Lights ===
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);
  
      // === Mesh (simple cube) ===
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0x00d1ff });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
  
      // === Animation loop ===
      let frameId;
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
  
      // === Handle resize ===
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);
  
      // === Cleanup ===
      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
      };
    }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  )
}

export default HeroCanvas