import { useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getProject } from '../../content';
import Video from './video';
import Markdown from './markdown';

const MediaItem = ({ item, className, eager }) =>
  item.kind === 'video'
    ? <Video sources={item.sources} className={className} />
    : <img src={item.src} alt="" loading={eager ? 'eager' : 'lazy'} className={className} />;

const randomIndex = (length, except) => {
  if (length < 2) return 0;
  const index = Math.floor(Math.random() * (length - 1));
  return index >= except ? index + 1 : index;
};

const RandomMedia = ({ items }) => {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * items.length));
  const request = useRef(0);

  const showAnother = () => {
    const next = randomIndex(items.length, index);
    const item = items[next];
    const id = ++request.current;
    if (item.kind !== 'image') {
      setIndex(next);
      return;
    }
    const preload = new Image();
    preload.onload = preload.onerror = () => {
      if (request.current === id) setIndex(next);
    };
    preload.src = item.src;
  };

  return (
    <div className="media-random">
      <div
        className={`media-random-item ${items.length > 1 ? 'clickable' : ''}`}
        onClick={items.length > 1 ? showAnother : undefined}
      >
        <MediaItem item={items[index]} eager />
      </div>
      {items.length > 1 && (
        <button
          type="button"
          className="button"
          onClick={showAnother}
        >
          Random Image
        </button>
      )}
    </div>
  );
};

const ProjectPage = () => {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) return <Navigate to="/" replace />;

  const { title, html, facts, media, hero } = project;

  return (
    <div className="project">
      {hero ? (
        <div className="project-hero">
          {hero.kind === 'video' ? (
            <Video sources={hero.sources} className="project-hero-video" />
          ) : (
            <img src={hero.src} alt="" className="project-hero-video" />
          )}
          <h1>{title}</h1>
        </div>
      ) : (
        <h1>{title}</h1>
      )}
      {facts.length > 0 && (
        <div className="project-facts">
          {facts.map(({ label, value }) => (
            <div className="meta-row" key={label}>
              <div className="meta-label">{label}</div>
              <div className="meta-value">{value}</div>
            </div>
          ))}
        </div>
      )}
      <Markdown className="project-body" html={html} />
      {media.items.length > 0 && media.layout === 'full' &&
        media.items.map((item, i) => <MediaItem key={i} item={item} className="vid-full-width" />)}
      {media.items.length > 0 && media.layout === 'grid' && (
        <div className="media-grid">
          {media.items.map((item, i) => (
            <MediaItem key={i} item={item} className={item.vertical ? 'vertical-video' : undefined} />
          ))}
        </div>
      )}
      {media.items.length > 0 && media.layout === 'random' && <RandomMedia items={media.items} />}
    </div>
  );
};

export default ProjectPage;
