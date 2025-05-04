import { useState, useEffect } from 'react';
import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Element } from 'react-scroll';

import './App.css';

import DoublePenrose from './geometries/double_penrose_animated';
import Spheres from './geometries/spheres';
import Header from './components/header';
import About from './components/about';
import Work from './components/work';
import Contact from './components/contact';
import Footer from './components/footer';

const Scene = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ratio = size.height / size.width;
  const frustum = 10;
  const horizontal = ratio < 1 ? frustum / ratio : frustum;
  const vertical = ratio < 1 ? frustum : frustum * ratio;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div className='art'>
        <Canvas dpr={[1, 2]}>
          <ambientLight intensity={1.0} />
          <Spheres />
          <DoublePenrose />

          <OrthographicCamera
            makeDefault
            manual
            zoom={6}
            top={vertical}
            bottom={-vertical}
            left={-horizontal}
            right={horizontal}
            near={1}
            far={500}
            position={[0, 0, 100]}
          />
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
      <Footer />
    </div>
  );
};

export default Scene;
