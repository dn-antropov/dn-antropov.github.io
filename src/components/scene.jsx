import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller, Element } from 'react-scroll';
import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import DoublePenrose from '../geometries/double_penrose_animated';
import Spheres from '../geometries/spheres';
import About from './about';
import Work from './work';
import Contact from './contact';

const Scene = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      // Delay the scroll slightly to ensure DOM is ready
      setTimeout(() => {
        scroller.scrollTo(location.state.scrollTo, {
          smooth: true,
          duration: 333,
          offset: -50, // adjust for fixed header
        });
      }, 100); // tweak if needed
    }
  }, [location]);

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
  );
};

export default Scene;
