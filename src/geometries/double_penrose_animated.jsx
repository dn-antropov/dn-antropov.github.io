import React, { useEffect, useRef, useMemo } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { useAnimations, useFBO } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Vector2, Vector3, Quaternion, Euler, LoopRepeat, ShaderMaterial } from 'three';

import vertexShader from '../shaders/penroseVertex.glsl';
import fragmentShader from '../shaders/penroseFragment.glsl';
import useTap from '../hooks/useTap';

export default function DoublePenrose(props) {
  const rotation = new Vector3(35.265, -45.0, 0.0);
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
    cutPlaneNormal: {
      value: new Vector3(0, 0, 0)
    },
    winResolution: {
      value: new Vector2(
        window.innerWidth,
        window.innerHeight
      ).multiplyScalar(Math.min(window.devicePixelRatio, 2))
    },
    resaturation: {value: .75},
    squize: { value: 0 },
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
        child.material = shaderMaterial;
        meshRefs.current.push(child);
      }
    });
    // Set a static rotations
    if (group.current) {
      group.current.rotation.set(rotation.x * (Math.PI/180.0), rotation.y * (Math.PI/180.0), rotation.z * (Math.PI/180.0)); // Set static rotation (in radians)
      group.current.scale.set(0.2,0.2,0.2);

    }
  }, [scene]);

  // Play animations on mount
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach(action => {
        action.reset().setLoop(LoopRepeat).play();
      }); // Play all animations
    }
  }, [actions]);

  // Offscreen rendering target (FBO)
  const mainRenderTarget = useFBO();

  const bounceStart = useRef(-Infinity);
  const bounceQueued = useRef(false);
  const bounceDuration = 1.0;
  const continueThreshold = 0.4;

  useTap((tap) => {
    const p = (tap.time - bounceStart.current) / bounceDuration;
    if (p >= 1) {
      bounceStart.current = tap.time;
    } else if (p >= continueThreshold) {
      bounceQueued.current = true;
    }
  });

  useFrame((state) => {
    let p = (state.clock.getElapsedTime() - bounceStart.current) / bounceDuration;
    if (p >= 1 && bounceQueued.current) {
      bounceQueued.current = false;
      bounceStart.current += bounceDuration;
      p -= 1;
    }
    uniforms.squize.value = p >= 0 && p < 1 ? p : 0.0;

    const { gl, scene, camera } = state;
    // Disable what needs to be ignored
    camera.layers.disable(1);
    
    // Hide the meshes
    meshRefs.current.forEach(mesh => mesh.visible = false);

    gl.setRenderTarget(mainRenderTarget);
    // Render into the FBO
    gl.render(scene, camera);
    
    // Pass the texture data to our shader material
    shaderMaterial.uniforms.uTexture.value = mainRenderTarget.texture;
    shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
    shaderMaterial.uniforms.resaturation.value = 0.75;
    
    const localNormal = new Vector3(0, 1, 0);
    const quaternion = new Quaternion().setFromEuler(new Euler(rotation.x, rotation.y, rotation.z));
    const planeNormal = localNormal.clone().applyQuaternion(quaternion).normalize();
    shaderMaterial.uniforms.cutPlaneNormal.value.copy(planeNormal);

    gl.setRenderTarget(null);
    // Show the mesh
    meshRefs.current.forEach(mesh => mesh.visible = true);
    
    camera.layers.enable(1);
  });


  return <primitive ref={group} object={scene} />;
}
