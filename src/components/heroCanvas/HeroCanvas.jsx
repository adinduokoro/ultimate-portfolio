// App.jsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function Scene() {
  const ballerina = useLoader(OBJLoader, "/models/Ballerina.obj");
  const centerRef = useRef();
  const mouseX = useRef(0); // -1..1

  useEffect(() => {
    const onMove = (e) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1; // normalize to -1..1
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!centerRef.current) return;

    // Flip direction by negating the multiplier
    let targetY = -mouseX.current * Math.PI;

    const minY = -Math.PI / 6; // -30 degrees
    const maxY = Math.PI / 18; // +10 degrees
    targetY = THREE.MathUtils.clamp(targetY, minY, maxY);

    // Smooth easing toward target
    centerRef.current.rotation.y = THREE.MathUtils.lerp(
      centerRef.current.rotation.y,
      targetY,
      0.08
    );

    // Lock X so it doesn’t tilt
    centerRef.current.rotation.x = 0;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Center ref={centerRef}>
        <primitive
          object={ballerina}
          scale={0.11}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]} // base pose
        />
      </Center>
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
