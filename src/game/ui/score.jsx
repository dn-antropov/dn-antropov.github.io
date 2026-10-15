import { useEffect, useState } from 'react';
import useTap from '../useTap';
import { addPoints, getScore, useScore } from '../store';
import { toQuaternary } from '../quaternary';
import { milestoneValue } from '../levels';

const LENGTH = 8;
const VISIBLE_FOR = 5000;

export const ScoreTracker = () => {
  useTap(() => addPoints(milestoneValue('pointsPerTap', getScore(), 1)));
  return null;
};

export const ScoreOverlay = () => {
  const { score, lastTap } = useScore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (lastTap === 0) return;
    setVisible(true);
    const timeout = setTimeout(() => setVisible(false), VISIBLE_FOR);
    return () => clearTimeout(timeout);
  }, [lastTap]);

  return (
    <div className={`score ${visible ? 'visible' : ''}`} aria-label={`Score ${score}`}>
      {toQuaternary(score, LENGTH).map((symbol, i) => (
        <span key={i} className='score-digit'>{symbol}</span>
      ))}
    </div>
  );
};
