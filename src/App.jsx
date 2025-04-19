

import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Element } from "react-scroll";
import { ParallaxProvider } from 'react-scroll-parallax';

import './App.css';

// load art components
import DoublePenrose from './geometries/double_penrose_animated';
import Spheres from './geometries/spheres';
//load web components
import Header from './components/header'
import About from './components/about'
import Work from './components/work'
import Contact from './components/contact'

// import { ToneMapping, EffectComposer, Noise } from '@react-three/postprocessing'

const Scene = () => {
  const ratio =  window.innerHeight / window.innerWidth;
  const frustum = 10;
  const horizonal = ratio < 1 ? frustum / ratio : frustum;
  const vertical = ratio < 1 ? frustum : frustum * ratio;

  return (
    <ParallaxProvider>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div className='art'>
          <Canvas dpr={[1, 2]}>
            <ambientLight intensity={1.0} />
            <Spheres />
            <DoublePenrose />

            <OrthographicCamera
              makeDefault
              zoom={6}
              top={vertical}
              bottom={-vertical}
              left={-horizonal}
              right={horizonal}
              near={1}
              far={500}
              position={[0, 0, 100]}
            />

            {/* <EffectComposer>
              <Noise opacity={0.02} />
              <ToneMapping mode={6} />
            </EffectComposer> */}
          </Canvas>
        </div>
        <Header />
        <Element name='about'>
          <About />
        </Element>
        <Element name='work'>
          <Work />
        </Element>
        <Element name='contact'>
          <Contact />
        </Element>
      </div>
    </ParallaxProvider>
  );
};


export default Scene;
