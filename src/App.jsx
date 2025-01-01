

import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import './App.css';

import DoublePenrose from './geometries/double_penrose';
import Spheres from './geometries/spheres';
import Header from './components/header'

import { ToneMapping, EffectComposer, Noise } from '@react-three/postprocessing'

const Scene = () => {
  const ratio =  window.innerHeight / window.innerWidth;
  const frustum = 10;
  const horizonal = ratio < 1 ? frustum / ratio : frustum;
  const vertical = ratio < 1 ? frustum : frustum * ratio;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className='background'>
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
      </div>
      <Header />
      {/* <div className="overlay">Dmitrii Antropov</div> */}
    </div>
  );
};


export default Scene;
