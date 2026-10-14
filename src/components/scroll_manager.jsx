import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const positions = new Map();

const ScrollManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const currentKey = useRef(location.key);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

    const save = () => positions.set(currentKey.current, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    window.addEventListener('popstate', save, { capture: true });
    document.addEventListener('click', save, { capture: true });
    return () => {
      window.removeEventListener('scroll', save);
      window.removeEventListener('popstate', save, { capture: true });
      document.removeEventListener('click', save, { capture: true });
    };
  }, []);

  useLayoutEffect(() => {
    currentKey.current = location.key;

    if (navigationType === 'POP' && positions.has(location.key)) {
      const y = positions.get(location.key);
      window.scrollTo(0, y);
      const frame = requestAnimationFrame(() => window.scrollTo(0, y));
      return () => cancelAnimationFrame(frame);
    }
    if (!location.state?.scrollTo) window.scrollTo(0, 0);
  }, [location.key, navigationType]);

  return null;
};

export default ScrollManager;
