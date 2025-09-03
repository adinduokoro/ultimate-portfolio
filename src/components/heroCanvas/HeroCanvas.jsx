// App.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function Scene() {
  const ballerina = useLoader(OBJLoader, "/models/Ballerina.obj");

  const spinRef = useRef();   // parent: follows carousel spin
  const tiltRef = useRef();   // child: mouse tilt
  const mouseX = useRef(0);

  // mouse tracking for gentle tilt
  useEffect(() => {
    const onMove = (e) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // map ScrollTrigger progress -> rotation.y
  useEffect(() => {
    if (!spinRef.current) return;

    // smooth setter for rotation.y
    const quickY = gsap.quickTo(spinRef.current.rotation, "y", {
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
    });

    const onProgress = (e) => {
      const { progress, panels } = e.detail; // 0..1, total panel count
      const spinsPerPanel = 1;               // change to 0.5, 2, etc. if you want
      const targetY = progress * (panels - 1) * spinsPerPanel * Math.PI * 2;
      quickY(targetY);
    };

    window.addEventListener("carousel:progress", onProgress);
    return () => window.removeEventListener("carousel:progress", onProgress);
  }, []);

  // keep the subtle mouse tilt on the child
  useFrame(() => {
    if (!tiltRef.current) return;
    let targetY = -mouseX.current * Math.PI;                 // flip sign if desired
    targetY = THREE.MathUtils.clamp(targetY, -Math.PI/6, Math.PI/18);
    tiltRef.current.rotation.y = THREE.MathUtils.lerp(tiltRef.current.rotation.y, targetY, 0.08);
    tiltRef.current.rotation.x = 0;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* parent tracks carousel spin */}
      <group ref={spinRef}>
        {/* child keeps mouse tilt */}
        <Center ref={tiltRef}>
          <primitive
            object={ballerina}
            scale={0.11}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          />
        </Center>
      </group>
    </>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [-30, 0, 5], fov: 60 }}>
      <Scene />
    </Canvas>
  );
}
