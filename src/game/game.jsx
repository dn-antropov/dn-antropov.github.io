import { useState, useEffect } from 'react';
import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import DoublePenrose from './objects/double_penrose_animated';
import Click from './objects/click';
import Background from './objects/background';
import { ScoreOverlay, ScoreTracker } from './ui/score';
import Milestones from './ui/milestones';
import { TapSource } from './useTap';
import './game.css';

const Game = () => {
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
    <div className='art'>
      <Canvas dpr={[1, 2]}>
        <ambientLight intensity={1.0} />
        <Background />
        <DoublePenrose />
        <Click />
        <ScoreTracker />
        <TapSource />
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
      <ScoreOverlay />
      <Milestones />
    </div>
  );
};

export default Game;
