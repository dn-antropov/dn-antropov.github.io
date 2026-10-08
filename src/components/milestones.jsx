import { useEffect, useRef, useState } from 'react';
import { useScore } from '../store/score';
import milestones from '../data/milestones.json';
import './milestones.css';

const VISIBLE_FOR = 15000;

const Milestones = () => {
  const { score } = useScore();
  const [messages, setMessages] = useState([]);
  const shown = useRef(new Set());
  const timeouts = useRef([]);
  const nextId = useRef(0);

  useEffect(() => {
    const reached = milestones.filter((m) => m.score === score && !shown.current.has(m));
    if (reached.length === 0) return;

    reached.forEach((milestone) => {
      shown.current.add(milestone);
      const id = nextId.current++;
      setMessages((list) => [...list, { id, text: milestone.message }]);
      timeouts.current.push(
        setTimeout(() => setMessages((list) => list.filter((m) => m.id !== id)), VISIBLE_FOR)
      );
    });
  }, [score]);

  useEffect(() => {
    const pending = timeouts.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  return (
    <div className='milestones' aria-live='polite'>
      {messages.map((message) => (
        <div key={message.id} className='milestone' style={{ '--duration': `${VISIBLE_FOR}ms` }}>
          <div className='milestone-clip'>
            <div className='milestone-inner'>{message.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Milestones;
