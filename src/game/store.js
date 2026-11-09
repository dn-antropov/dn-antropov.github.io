import { useSyncExternalStore } from 'react';

export const MAX_SCORE = 65535;

let state = { score: 0, lastTap: 0, completions: 0 };
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const addPoints = (amount = 1) => {
  const start = state.score >= MAX_SCORE ? 0 : state.score;
  const score = Math.min(start + amount, MAX_SCORE);
  state = {
    score,
    lastTap: state.lastTap + 1,
    completions: state.completions + (score === MAX_SCORE ? 1 : 0),
  };
  listeners.forEach((listener) => listener());
};

export const completeGame = () => {
  state = { ...state, score: MAX_SCORE, completions: state.completions + 1 };
  listeners.forEach((listener) => listener());
};

export const useScore =() => useSyncExternalStore(subscribe, () => state);
