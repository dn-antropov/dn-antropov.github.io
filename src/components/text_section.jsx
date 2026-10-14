import { sections } from '../content';
import Markdown from './projects/markdown';

const TextSection = ({ name }) => {
  const section = sections[name];

  return (
    <>
      <h1>{section.title}</h1>
      <Markdown html={section.html} />
    </>
  );
};

export default TextSection;
