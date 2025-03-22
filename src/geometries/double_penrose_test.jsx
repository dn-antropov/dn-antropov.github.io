import React, { useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { useAnimations } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshStandardMaterial } from 'three';

export default function DoublePenrose(props) {
  const group = useRef();
  
  // Load the GLTF model
  const { scene, animations } = useLoader(GLTFLoader, './glb/animated_double_penrose.glb');
  
  // Extract animations
  const { actions } = useAnimations(animations, group);

  // Apply simple lit material to all meshes
  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({ color: 0x888888, roughness: 0.5, metalness: 0.2 });
      }
    });

    // Set a static rotation (for example, 45 degrees on the Y axis)
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

  return <primitive ref={group} object={scene} />;
}
