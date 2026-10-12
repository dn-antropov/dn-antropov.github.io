import { useNavigate } from 'react-router-dom';

const isInternal = (href) => Boolean(href) && href[0] === '/' && href[1] !== '/';

const Markdown = ({ html, className }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    const link = event.target.closest('a');
    if (!link || link.target || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const href = link.getAttribute('href');
    if (!isInternal(href)) return;
    event.preventDefault();
    navigate(href);
  };

  return <div className={className} onClick={handleClick} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Markdown;
