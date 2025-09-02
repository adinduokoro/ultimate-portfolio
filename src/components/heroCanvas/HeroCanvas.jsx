import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import { DirectionalLightHelper, CameraHelper } from "three";
import { useControls } from "leva";

function Scene() {
  const boxRef = useRef();
  const sphereRef = useRef();
  const dirLightRef = useRef();

  useHelper(dirLightRef, DirectionalLightHelper, 5, "white");

  const { sphereColor, wireframe, speed } = useControls({
    sphereColor: { value: "#ffea00" }, 
    wireframe: { value: false },
    speed: { value: 0.01, min: 0, max: 1, step: 0.001 },
  });

  let step = 0;

  useFrame((_, delta) => {
    boxRef.current.rotation.x += 1 * delta;
    boxRef.current.rotation.y += 1 * delta;

    step += speed;
    sphereRef.current.position.y = 10 * Math.abs(Math.sin(step));
  });

  return (
    <>
      <axesHelper args={[5]} />

      <mesh ref={boxRef} rotation={[5, 5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#00ff00" />
      </mesh>

      <OrbitControls />

      <mesh receiveShadow rotation={[-0.5 * Math.PI, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="lightgray" side={THREE.DoubleSide} />
      </mesh>

      <gridHelper args={[30]} />

      <mesh castShadow ref={sphereRef} position={[-10, 10, 0]}>
        <sphereGeometry args={[4, 30, 30]} />
        <meshStandardMaterial color={sphereColor} wireframe={wireframe} />
      </mesh>

      <ambientLight color={0x333333} intensity={0.3}/>
      <directionalLight
      castShadow
        ref={dirLightRef}
        color={0xffffff}
        intensity={0.8}
        position={[-30, 50, 0]}
      />
    </>
  );
}

const HeroCanvas = () => {
  return (
    <Canvas
    shadows
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [-10, 30, 30],
      }}
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
      }}
    >
      <Scene />
    </Canvas>
  );
};

export default HeroCanvas;