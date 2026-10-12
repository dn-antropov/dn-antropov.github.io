import { Navigate, useParams } from 'react-router-dom';
import { getProject } from '../../content';
import Video from './video';
import Markdown from './markdown';
import './project.css';

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
      {media.layout === 'full' ? (
        media.items.map((item, i) => (
          <Video key={i} sources={item.sources} className="vid-full-width" />
        ))
      ) : media.items.length > 0 && (
        <div className="media-grid">
          {media.items.map((item, i) => (
            <Video key={i} sources={item.sources} className={item.vertical ? 'vertical-video' : undefined} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
