import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector2, Vector3 } from 'three';

const TAP_MAX_DURATION = 250;
const TAP_MAX_DISTANCE = 10;

export default function useTap(onTap) {
  const gl = useThree((state) => state.gl);
  const get = useThree((state) => state.get);
  const onTapRef = useRef(onTap);

  useEffect(() => {
    onTapRef.current = onTap;
  }, [onTap]);

  useEffect(() => {
    const element = gl.domElement;
    let press = null;

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

      const { camera, clock } = get();
      const rect = element.getBoundingClientRect();
      const ndc = new Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      const world = new Vector3(ndc.x, ndc.y, 0).unproject(camera);
      world.z = 0;

      onTapRef.current({
        clientX: event.clientX,
        clientY: event.clientY,
        ndc,
        world,
        time: clock.getElapsedTime(),
      });
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
}
