import { useState, useEffect, useRef } from 'react';
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
  const art = useRef();
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = art.current;
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((current) =>
        current.width === width && current.height === height ? current : { width, height }
      );
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    resizeObserver.observe(element);
    visibilityObserver.observe(element);
    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  const ratio = size.height / size.width;
  const frustum = 10;
  const horizontal = ratio < 1 ? frustum / ratio : frustum;
  const vertical = ratio < 1 ? frustum : frustum * ratio;

  return (
    <div className='art' ref={art}>
      <Canvas dpr={[1, 1.5]} frameloop={inView ? 'always' : 'never'}>
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
