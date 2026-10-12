import { Link } from 'react-router-dom';
import { projectsIn, sections } from '../../content';
import CardMedia from './card_media';
import Markdown from './markdown';

const ProjectSection = ({ category }) => {
  const section = sections[category];

  return (
    <>
      <h1>{section.title}</h1>
      <Markdown html={section.html} />
      {projectsIn(category).map((project) => (
        <div className="thumbnail" key={project.slug}>
          <Link to={`/projects/${project.slug}`}>
            <h1>{project.cardTitle ?? project.title}</h1>
            <CardMedia items={project.card} />
          </Link>
        </div>
      ))}
    </>
  );
};

export default ProjectSection;
