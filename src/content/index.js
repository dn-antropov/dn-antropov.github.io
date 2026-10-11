import { parse as parseYaml } from 'yaml';
import { Marked } from 'marked';

const VIDEO_TYPES = { webm: 'video/webm', mp4: 'video/mp4', mov: 'video/quicktime' };

const escapeAttribute = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const resolveHref = (slug, href) =>
  !slug || /^([a-z]+:|\/)/i.test(href) ? href : `/projects/${slug}/${href}`;

const createMarkdown = (slug) =>
  new Marked({
    renderer: {
      image({ href, title, text }) {
        const caption = title || text;
        return [
          '<figure class="project-figure">',
          `<img src="${escapeAttribute(resolveHref(slug, href))}" alt="${escapeAttribute(text)}" loading="lazy">`,
          caption ? `<figcaption>${escapeAttribute(caption)}</figcaption>` : '',
          '</figure>',
        ].join('');
      },
      paragraph({ tokens }) {
        if (tokens.length === 1 && tokens[0].type === 'image') return this.parser.parseInline(tokens);
        return false;
      },
    },
  });

const parseFile = (path, raw, slug) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${path}: missing --- header block`);
  try {
    return { data: parseYaml(match[1]) ?? {}, html: createMarkdown(slug).parse(match[2].trim()) };
  } catch (error) {
    throw new Error(`${path}: ${error.message}`);
  }
};

const nameOf = (path) => path.split('/').pop().replace(/\.md$/, '');

const toSources = (slug, files) =>
  [files].flat().map((file) => ({
    src: `/projects/${slug}/${file}`,
    type: VIDEO_TYPES[file.split('.').pop().toLowerCase()],
  }));

const toMediaItem = (slug, item) =>
  typeof item === 'string'
    ? { sources: toSources(slug, item), vertical: false }
    : { sources: toSources(slug, item.src), vertical: Boolean(item.vertical) };

const projectFiles = import.meta.glob('./projects/?*.md', { query: '?raw', import: 'default', eager: true });
const sectionFiles = import.meta.glob('./sections/?*.md', { query: '?raw', import: 'default', eager: true });

export const projects = Object.entries(projectFiles)
  .map(([path, raw]) => {
    const slug = nameOf(path);
    const { data, html } = parseFile(path, raw, slug);
    return {
      ...data,
      slug,
      html,
      facts: data.facts ?? [],
      card: data.card ? toSources(slug, data.card) : [],
      hero: data.hero ? toSources(slug, data.hero) : null,
      media: {
        layout: data.media?.layout ?? 'grid',
        items: (data.media?.items ?? []).map((item) => toMediaItem(slug, item)),
      },
    };
  })
  .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));

export const sections = Object.fromEntries(
  Object.entries(sectionFiles).map(([path, raw]) => {
    const { data, html } = parseFile(path, raw);
    return [nameOf(path), { ...data, html }];
  })
);

export const getProject = (slug) => projects.find((project) => project.slug === slug);

export const projectsIn = (category) => projects.filter((project) => project.category === category);
