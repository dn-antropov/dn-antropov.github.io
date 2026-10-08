import { useEffect, useState } from 'react';
import useTap from '../hooks/useTap';
import { addPoint, useScore } from '../store/score';
import './score.css';

const DIGITS = ['▶︎', '▼︎', '◀︎', '▲︎'];
const LENGTH = 8;
const VISIBLE_FOR = 5000;

const toQuaternary = (value) =>
  value.toString(4).padStart(LENGTH, '0').split('').map((digit) => DIGITS[Number(digit)]);

export const ScoreTracker = () => {
  useTap(addPoint);
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
      {toQuaternary(score).map((symbol, i) => (
        <span key={i} className='score-digit'>{symbol}</span>
      ))}
    </div>
  );
};
