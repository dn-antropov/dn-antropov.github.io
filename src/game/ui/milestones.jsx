import { useEffect, useRef, useState } from 'react';
import { useScore } from '../store';
import milestones from '../milestones.json';
import { withQuaternaryNumbers } from '../quaternary';

const VISIBLE_FOR = 15000;
const FADE_OUT_AT = 0.93;

const Milestones = () => {
  const { score } = useScore();
  const [messages, setMessages] = useState([]);
  const [active, setActive] = useState(0);
  const shown = useRef(new Set());
  const nextId = useRef(0);
  const timeouts = useRef(new Set());

  useEffect(() => {
    const reached = milestones.filter((m) => m.score <= score && !shown.current.has(m));
    if (reached.length === 0) return;

    reached.forEach((milestone) => {
      shown.current.add(milestone);
      const id = nextId.current++;
      setMessages((list) => [...list, { id, text: withQuaternaryNumbers(milestone.message) }]);
      setActive((count) => count + 1);
      const timeout = setTimeout(() => {
        timeouts.current.delete(timeout);
        setActive((count) => Math.max(0, count - 1));
      }, VISIBLE_FOR * FADE_OUT_AT);
      timeouts.current.add(timeout);
    });
  }, [score]);

  useEffect(() => {
    const pending = timeouts.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const remove = (id) => setMessages((list) => list.filter((m) => m.id !== id));

  return (
    <div className={`milestones ${active > 0 ? 'visible' : ''}`} aria-live='polite'>
      {messages.map((message, i) => (
        <div
          key={message.id}
          className={`milestone ${i === messages.length - 1 ? 'latest' : ''}`}
          style={{ '--duration': `${VISIBLE_FOR}ms` }}
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) remove(message.id);
          }}
        >
          <div className='milestone-clip'>
            <div className='milestone-inner'>{message.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Milestones;
