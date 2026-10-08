import { useSyncExternalStore } from 'react';

export const MAX_SCORE = 65535;

let state = { score: 0, lastTap: 0 };
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const addPoint = () => {
  state = {
    score: Math.min(state.score + 1, MAX_SCORE),
    lastTap: state.lastTap + 1,
  };
  listeners.forEach((listener) => listener());
};

export const getScore = () => state.score;

export const useScore =() => useSyncExternalStore(subscribe, () => state);
