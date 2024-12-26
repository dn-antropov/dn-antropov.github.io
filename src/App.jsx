

import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { range } from './utils';

import './scene.css';

import DoublePenrose from "./geometries/double_penrose";
import Spheres from "./geometries/spheres";

import { ToneMapping, EffectComposer, Noise } from '@react-three/postprocessing'

const Scene = () => {
  const ratio =  window.innerHeight / window.innerWidth;
  const frustum = 10;
  const horizonal = ratio < 1 ? frustum / ratio : frustum;
  const vertical = ratio < 1 ? frustum : frustum * ratio;

  return (
    <Canvas dpr={[1, 2]}>
      <ambientLight intensity={1.0} />
      <Spheres />
      <DoublePenrose/>

      <OrthographicCamera
        makeDefault
        zoom={7}
        top={vertical}
        bottom={-vertical}
        left={-horizonal}
        right={horizonal}
        near={1}
        far={500}
        position={[0, 0, 100]}
      />

      <EffectComposer>
        <Noise opacity={0.02} />
        <ToneMapping mode={6} />
      </EffectComposer>
    </Canvas>
  );
};


export default Scene;
