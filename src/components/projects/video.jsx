import { useEffect, useRef } from 'react';

const Video = ({ sources, className }) => {
  const ref = useRef();
  const id = sources.map(({ src }) => src).join('|');

  useEffect(() => {
    const video = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [id]);

  return (
    <video key={id} ref={ref} muted loop playsInline preload="none" className={className}>
      {sources.map(({ src, type }) => (
        <source key={src} src={src} type={type} />
      ))}
    </video>
  );
};

export default Video;
