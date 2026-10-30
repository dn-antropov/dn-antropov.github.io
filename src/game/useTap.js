import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector2, Vector3 } from 'three';
const TAP_MAX_DURATION = 250;
const TAP_MAX_DISTANCE = 10;

const subscribers = new Set();

export function TapSource() {
  const gl = useThree((state) => state.gl);
  const get = useThree((state) => state.get);

  useEffect(() => {
    const element = gl.domElement;
    let press = null;

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

    const handlePointerDown = (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      press = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp };
    };

    const handlePointerUp = (event) => {
      if (!press || event.pointerId !== press.id) return;
      const duration = event.timeStamp - press.time;
      const distance = Math.hypot(event.clientX - press.x, event.clientY - press.y);
      press = null;
      if (duration > TAP_MAX_DURATION || distance > TAP_MAX_DISTANCE) return;
      emit(event.clientX, event.clientY);
    };

    const handlePointerCancel = () => {
      press = null;
    };

    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('pointerup', handlePointerUp);
    element.addEventListener('pointercancel', handlePointerCancel);
    return () => {
      element.removeEventListener('pointerdown', handlePointerDown);
      element.removeEventListener('pointerup', handlePointerUp);
      element.removeEventListener('pointercancel', handlePointerCancel);
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
