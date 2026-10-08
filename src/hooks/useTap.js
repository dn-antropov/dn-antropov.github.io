import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector2, Vector3 } from 'three';
import { getScore } from '../store/score';

const TAP_MAX_DURATION = 250;
const TAP_MAX_DISTANCE = 10;
export const HOLD_UNLOCK_SCORE = 10;
const HOLD_TAPS_PER_SECOND = 10;

const subscribers = new Set();

export function TapSource() {
  const gl = useThree((state) => state.gl);
  const get = useThree((state) => state.get);

  useEffect(() => {
    const element = gl.domElement;
    let press = null;
    let holdTimeout = null;
    let holdInterval = null;

    const emit = (clientX, clientY) => {
      const { camera, clock } = get();
      const rect = element.getBoundingClientRect();
      const ndc = new Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
      const world = new Vector3(ndc.x, ndc.y, 0).unproject(camera);
      world.z = 0;

      const tap = { clientX, clientY, ndc, world, time: clock.getElapsedTime() };
      subscribers.forEach((subscriber) => subscriber(tap));
    };

    const stopHold = () => {
      clearTimeout(holdTimeout);
      clearInterval(holdInterval);
      holdTimeout = null;
      holdInterval = null;
    };

    const startHold = () => {
      holdTimeout = null;
      if (!press) return;
      press.holding = true;
      emit(press.lastX, press.lastY);
      holdInterval = setInterval(() => emit(press.lastX, press.lastY), 1000 / HOLD_TAPS_PER_SECOND);
    };

    const handlePointerDown = (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      stopHold();
      press = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        lastX: event.clientX,
        lastY: event.clientY,
        time: event.timeStamp,
        holding: false,
      };
      element.setPointerCapture(event.pointerId);
      if (getScore() >= HOLD_UNLOCK_SCORE) {
        holdTimeout = setTimeout(startHold, TAP_MAX_DURATION);
      }
    };

    const handlePointerMove = (event) => {
      if (!press || event.pointerId !== press.id) return;
      press.lastX = event.clientX;
      press.lastY = event.clientY;
      const distance = Math.hypot(event.clientX - press.x, event.clientY - press.y);
      if (!press.holding && distance > TAP_MAX_DISTANCE) stopHold();
    };

    const handlePointerUp = (event) => {
      if (!press || event.pointerId !== press.id) return;
      const wasHolding = press.holding;
      const duration = event.timeStamp - press.time;
      const distance = Math.hypot(event.clientX - press.x, event.clientY - press.y);
      stopHold();
      press = null;
      if (wasHolding) return;
      if (duration > TAP_MAX_DURATION || distance > TAP_MAX_DISTANCE) return;
      emit(event.clientX, event.clientY);
    };

    const handlePointerCancel = () => {
      stopHold();
      press = null;
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerup', handlePointerUp);
    element.addEventListener('pointercancel', handlePointerCancel);
    element.addEventListener('contextmenu', handleContextMenu);
    return () => {
      stopHold();
      element.removeEventListener('pointerdown', handlePointerDown);
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerup', handlePointerUp);
      element.removeEventListener('pointercancel', handlePointerCancel);
      element.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [gl, get]);

  return null;
}

export default function useTap(onTap) {
  const onTapRef = useRef(onTap);

  useEffect(() => {
    onTapRef.current = onTap;
  }, [onTap]);

  useEffect(() => {
    const subscriber = (tap) => onTapRef.current(tap);
    subscribers.add(subscriber);
    return () => subscribers.delete(subscriber);
  }, []);
}
