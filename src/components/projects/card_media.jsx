import Video from './video';

const SLANT = 16;
const GAP = '3px';

const edge = (percent, shift) => (shift ? `calc(${percent}% ${shift})` : `${percent}%`);

const panelsFor = (count) =>
  Array.from({ length: count }, (_, i) => {
    const first = i === 0;
    const last = i === count - 1;
    const leftCentre = (i * 100) / count;
    const rightCentre = ((i + 1) * 100) / count;
    const topLeft = first ? 0 : leftCentre + SLANT / 2;
    const bottomLeft = first ? 0 : leftCentre - SLANT / 2;
    const topRight = last ? 100 : rightCentre + SLANT / 2;
    const bottomRight = last ? 100 : rightCentre - SLANT / 2;
    const left = first ? null : `+ ${GAP}`;
    const right = last ? null : `- ${GAP}`;

    return {
      clipPath: `polygon(${edge(topLeft, left)} 0, ${edge(topRight, right)} 0, ${edge(bottomRight, right)} 100%, ${edge(bottomLeft, left)} 100%)`,
      media: { left: `${bottomLeft}%`, width: `${topRight - bottomLeft}%` },
    };
  });

const CardMedia = ({ items }) => {
  if (items.length === 0) return null;

  const panels = panelsFor(items.length);

  return (
    <div className="card-media">
      {items.map((item, i) => (
        <div className="card-panel" key={i} style={{ clipPath: panels[i].clipPath }}>
          {item.kind === 'video' ? (
            <Video sources={item.sources} style={panels[i].media} />
          ) : (
            <img src={item.src} alt="" loading="lazy" style={panels[i].media} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CardMedia;
