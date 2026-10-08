import { Object3D } from 'three';
import { useTexture } from '@react-three/drei';
import {useRef, useMemo, useEffect} from 'react'
import {useFrame, useLoader} from '@react-three/fiber'

import useTap from '../hooks/useTap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const MAX = 1000;
const LIFETIME = 1.
const randomVector = (r) => [r / 2 - Math.random() * r, r / 2 - Math.random() * r, r / 2 - Math.random() * r]
const randomEuler = () => [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
const data = Array.from({ length: 1000 }, (r = 10) => ({ random: Math.random(), position: randomVector(r), rotation: randomEuler() }))

export default function Click (props) {
  const mesh = useRef();
  const dummy = useMemo(() => new Object3D(), []);
  //const texture = useTexture('/textures/click.png')
  const { scene } = useLoader(GLTFLoader, './glb/triangle.glb');
  const slots = useMemo(
    () => Array.from({ length: MAX }, () => ({ active: false, born: 0, x: 0, y: 0, dx: 0, dy: 0, xAngle: 0, yAngle: 0, zAngle: 0, scale: 0 })),
    []
  );
  useEffect(() => {
    dummy.position.setY(100.);
    dummy.rotation.set(0, 0, 33);
    dummy.scale.setScalar(0.00);
    dummy.updateMatrix();
    for (let i = 0; i < MAX; i++) mesh.current.setMatrixAt(i, dummy.matrix);
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [dummy])
  
  const cursor = useRef(0);
  useFrame(({clock}) => {
      const now = clock.getElapsedTime();
      let dirty = false;
  
      for (let i = 0; i < MAX; i++) {
        const slot = slots[i];
        if (!slot.active) continue;
  
        const age = (now - slot.born) / LIFETIME;
        if (age >= 1.) {
          slot.active = false;
          dummy.position.setY(100.);
        } else {
          dummy.position.set(slot.x + slot.dx * age * 1.5, slot.y + slot.dy * age * 1.7, 5);
          dummy.rotation.set(slot.xAngle * age, slot.yAngle * age, slot.zAngle * age)
          dummy.scale.setScalar(slot.scale * age)
        }
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
        dirty = true;
      }
      if (dirty) mesh.current.instanceMatrix.needsUpdate = true;
    }
  )
  useTap((tap) => {
    const slot = slots[cursor.current];
    cursor.current = (cursor.current + 1) % MAX;
    slot.active = true;
    slot.born = tap.time;
    // slot.x = tap.world.x;
    // slot.y = tap.world.y;
    slot.x = 0;
    slot.y = 0;
    const angle = Math.random() * Math.PI * 2;
    slot.dx = Math.cos(angle);
    slot.dy = Math.sin(angle);
    slot.scale = Math.random() * 0.025 + 0.025
    slot.xAngle = Math.random() * Math.PI * 2;
    slot.yAngle = Math.random() * Math.PI * 2;
    slot.zAngle = Math.random() * Math.PI * 2;
  });
  return (
    <instancedMesh
      ref={mesh}
      args={[scene.children[0].geometry, undefined, MAX]}
      layers={1}
      frustumCulled={false}
      raycast={() => null}
    >
      <meshStandardMaterial
        color="orchid"
        transparent opacity={0.5}
        depthWrite={false} 
      />
    </instancedMesh>
  )
}