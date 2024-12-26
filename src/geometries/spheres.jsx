import * as THREE from 'three';
import{ useRef } from 'react';
import { range, easeInOutQuad } from '../utils';

import { useFrame } from "@react-three/fiber";

export default function Spheres(props) {
  const backgroundGroup = useRef();
  const columns = range(-3., 3., 1.0);
  const rows = range(-2.5, 2.5, 1.0);
  let prevTime = 0;
  let progress = 0;

  useFrame((state) => {
    // put your code here
    if (backgroundGroup.current) {
      const time = state.clock.getElapsedTime();
      progress += (time - prevTime) * 0.2;
      prevTime = time;
      if (progress > 1.0) {
        progress = 0.0 + (progress - 1.0)
      }

      backgroundGroup.current.children.forEach((mesh, index) => {
        // Create unique animation for each mesh based on index
        if (progress % 1 <= 0.5 ) {
          const easyProgress = easeInOutQuad(progress % 1 * 2);
          if ( index % 6 % 2 == 0) {
            mesh.position.x =  Math.floor(index / 6) - 3.0  + easyProgress;
          } else {
            mesh.position.x =  Math.floor(index / 6) - 3.0  - easyProgress;
          }
        }
        else {
          const easyProgress = easeInOutQuad((progress - 0.5) % 1 * 2);
          if ( Math.floor(index / 6) % 2 == 0) {
            mesh.position.y =  index % 6  + easyProgress - 2.5;
          } else {
            mesh.position.y =  index % 6  - easyProgress - 2.5;
          }
        }
      });
    }
  });

  return (
    <>
      <color attach="background" args={["black"]} />
      <group ref={backgroundGroup}>
        {columns.map((col, i) =>
          rows.map((row, j) => (
            <mesh position={[col, row, -4]}>
              <icosahedronGeometry args={[0.20, 8]} />
              <meshStandardMaterial color="gray" />
            </mesh>
          ))
        )}
      </group>
    </>
  );
}