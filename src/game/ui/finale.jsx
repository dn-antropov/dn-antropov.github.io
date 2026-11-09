import { useEffect, useState } from 'react';
import { completeGame, useScore } from '../store';
import useTap from '../useTap';

const VISIBLE_FOR = 10000;

const MESSAGE = `Congratulations.\nYou've clicked 65535 times.\nNow, do it again.`;

const Finale = () => {
  const { completions } = useScore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('game-over') === 'true') completeGame();
  }, []);

  useTap(() => setVisible(false));

  useEffect(() => {
    if (completions === 0) return;
    setVisible(true);
    const timeout = setTimeout(() => setVisible(false), VISIBLE_FOR);
    return () => clearTimeout(timeout);
  }, [completions]);

  return (
    <div className={`finale ${visible ? 'visible' : ''}`} aria-live='polite'>
      {completions > 0 && MESSAGE}
    </div>
  );
};

export default Finale;
