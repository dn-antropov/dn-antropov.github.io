import React, { useEffect, useRef, useMemo } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { useAnimations, useFBO } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshStandardMaterial, Vector2, ShaderMaterial } from 'three';

import vertexShader from '../shaders/vertexShader.glsl';
import fragmentShader from '../shaders/fragmentShader.glsl';

export default function DoublePenrose(props) {
  const group = useRef();
  const meshRefs = useRef([]);

  // Load the GLTF model
  const { scene, animations } = useLoader(GLTFLoader, './glb/animated_double_penrose.glb');

  // Extract animations
  const { actions } = useAnimations(animations, group);

  // Shader uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTexture: { value: null },
    winResolution: {
      value: new Vector2(
        window.innerWidth,
        window.innerHeight
      ).multiplyScalar(Math.min(window.devicePixelRatio, 2))
    },
  }), []);

  const shaderMaterial = useMemo(() => new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
  }), [uniforms]);

  // Apply simple lit material to all meshes
  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        // child.material = new MeshStandardMaterial({ color: 0x888888, roughness: 0.5, metalness: 0.2 });
        child.material = shaderMaterial;
        meshRefs.current.push(child);
      }
    });
    // Set a static rotations
    if (group.current) {
      group.current.rotation.set( Math.PI * 0.14, Math.PI * 1.75, Math.PI * 0.0); // Set static rotation (in radians)
      group.current.scale.set(0.2,0.2,0.2);
    }
  }, [scene]);

  // Play animations on mount
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach(action => action.play()); // Play all animations
    }
  }, [actions]);

  // Offscreen rendering target (FBO)
  const mainRenderTarget = useFBO();

  useFrame((state) => {
    const { gl, scene, camera } = state;

    // Hide the meshes
    meshRefs.current.forEach(mesh => mesh.visible = false);

    gl.setRenderTarget(mainRenderTarget);
    // Render into the FBO
    gl.render(scene, camera);

    // Pass the texture data to our shader material
    shaderMaterial.uniforms.uTexture.value = mainRenderTarget.texture;
    shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime();;

    gl.setRenderTarget(null);
    // Show the mesh
    meshRefs.current.forEach(mesh => mesh.visible = true);
  });


  return <primitive ref={group} object={scene} />;
}
