import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
import { useFrame, useLoader } from '@react-three/fiber';
import { useFBO, useAnimations } from '@react-three/drei';
import React, { useRef, useMemo } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import vertexShader from '../shaders/vertexShader.glsl';
import fragmentShader from '../shaders/fragmentShader.glsl';

export default function DoublePenrose(props) {
  const meshRefs = useRef([]);
  
  // Load the model and animations
  const { scene, animations } = useLoader(GLTFLoader, './glb/animated_double_penrose.glb');
  
  // Use animation clips from the model
  const { actions } = useAnimations(animations, scene);

  // Extract geometries from all child meshes in the scene
  const geometries = useMemo(() => {
    return scene.children.map(child => child.geometry).filter(Boolean);
  }, [scene]);

  // Offscreen rendering target (FBO)
  const mainRenderTarget = useFBO();

  // Shader uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: null },
    winResolution: { 
      value: new THREE.Vector2(
        window.innerWidth, 
        window.innerHeight
      ).multiplyScalar(Math.min(window.devicePixelRatio, 2))
    },
  }), []);

  // Start animation on mount
  React.useEffect(() => {
    if (actions) {
      Object.values(actions).forEach(action => action.play()); // Play all animations
    }
  }, [actions]);

  useFrame((state) => {
    const { gl, scene, camera, clock } = state;

    meshRefs.current.forEach(mesh => {
      if (!mesh) return;
      mesh.visible = false;
    });

    gl.setRenderTarget(mainRenderTarget);
    gl.render(scene, camera);

    meshRefs.current.forEach(mesh => {
      if (!mesh) return;
      mesh.material.uniforms.uTexture.value = mainRenderTarget.texture;
      mesh.material.uniforms.uTime.value = clock.getElapsedTime();
      mesh.visible = true;
    });

    gl.setRenderTarget(null);
  });

  return (
    <group>
      {geometries.map((geometry, index) => (
        <mesh key={index} ref={(el) => (meshRefs.current[index] = el)} geometry={geometry}>
          <shaderMaterial
            key={uuidv4()}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
          />
        </mesh>
      ))}
    </group>
  );
}
