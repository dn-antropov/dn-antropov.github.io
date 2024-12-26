import * as THREE from 'three'

import { v4 as uuidv4 } from "uuid";
import { useFrame, useLoader } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";


import React, { useRef, useState, useLayoutEffect, useMemo } from 'react'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import vertexShader from "../shaders/vertexShader.glsl";
import fragmentShader from "../shaders/fragmentShader.glsl";

import { easeInOutQuad } from '../utils';

export default function DoublePenrose(props) {
  // This reference gives us direct access to our mesh
  const mesh = useRef();

  // Load the GLTF model using useLoader
  const { scene } = useLoader(GLTFLoader, './glb/double_penrose.glb');

  // Extract the geometry of the model (assuming it's the first child in the scene)
  const modelGeometry = scene.children[0]?.geometry;

  // This is our main render target where we'll render and store the scene as a texture
  const mainRenderTarget = useFBO();

  const uniforms = useMemo(() => ({
    uTime: {
      value: null
    },
    uTexture: {
      value: null
    },
    winResolution: {
      value: new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
      ).multiplyScalar(Math.min(window.devicePixelRatio, 2)), // if DPR is 3 the shader glitches 🤷‍♂️
    },
  }), [])

  useFrame((state) => {
    const { gl, scene, camera } = state;
    // Hide the mesh
    mesh.current.visible = false;
    gl.setRenderTarget(mainRenderTarget);
    // Render into the FBO
    gl.render(scene, camera);

    // Pass the texture data to our shader material
    mesh.current.material.uniforms.uTexture.value = mainRenderTarget.texture;
    mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();

    // rotate the mesh
    // i use fractional part of time and scale to last the cycle for 10 seconds
    let rotationTime = state.clock.getElapsedTime() * 0.1;
    mesh.current.rotation.y = Math.PI *
                              //make first two seconds rotate the penrose by 180 degrees
                              (easeInOutQuad(((Math.min(rotationTime % 1, 0.2) * 5.0))) +
                              // repeat rotation starting from second 5
                              easeInOutQuad(((Math.min(Math.max(rotationTime % 1,0.5), 0.7) - 0.5) * 5.0)));

    // mesh.current.rotation.y =
    // if (time * 2 % 1 >= 0.5 && time * 2 % 1 <= 0.75) {
    //   mesh.current.rotation.y = 180 + (((time * 2 % 1 - 0.5) * 4) * 180);
    // }

    gl.setRenderTarget(null);
    // Show the mesh
    mesh.current.visible = true;
  });

  return (
    <mesh ref={mesh} geometry={modelGeometry}>
        {/* <icosahedronGeometry args={[2.84, 20]} /> */}
        <shaderMaterial
          key={uuidv4()}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
  );
}

