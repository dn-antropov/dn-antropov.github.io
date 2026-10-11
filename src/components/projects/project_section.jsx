import { Link } from 'react-router-dom';
import { projectsIn, sections } from '../../content';
import Video from './video';

const ProjectSection = ({ category }) => {
  const section = sections[category];

  return (
    <>
      <h1>{section.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: section.html }} />
      {projectsIn(category).map((project) => (
        <div className="thumbnail" key={project.slug}>
          <Link to={`/projects/${project.slug}`}>
            <h1>{project.cardTitle ?? project.title}</h1>
            <Video sources={project.card} className="vid" />
          </Link>
        </div>
      ))}
    </>
  );
};

export default ProjectSection;
