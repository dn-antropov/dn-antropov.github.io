import { useRef, useState } from 'react';
import useTap from '../useTap';

const ClickHint = () => {
  const circle = useRef();
  const [hidden, setHidden] = useState(false);

  useTap(({ clientX, clientY }) => {
    if (hidden || !circle.current) return;
    const rect = circle.current.getBoundingClientRect();
    const radius = rect.width / 2;
    const dx = clientX - (rect.left + radius);
    const dy = clientY - (rect.top + radius);
    if (dx * dx + dy * dy <= radius * radius) setHidden(true);
  });

  return (
    <div ref={circle} className={`click-hint ${hidden ? 'hidden' : ''}`} aria-hidden={hidden}>
      Click
    </div>
  );
};

export default ClickHint;
