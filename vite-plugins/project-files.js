import fs from 'node:fs';
import path from 'node:path';

const MODULE_ID = 'virtual:project-files';
const RESOLVED_ID = `\0${MODULE_ID}`;

const listFiles = (dir, base = dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full, base);
    return [path.relative(base, full).split(path.sep).join('/')];
  });

export default function projectFiles() {
  const root = path.resolve('public/projects');

  return {
    name: 'project-files',
    resolveId(source) {
      return source === MODULE_ID ? RESOLVED_ID : null;
    },
    load(id) {
      if (id !== RESOLVED_ID) return null;
      const files = fs.existsSync(root) ? listFiles(root).sort() : [];
      return `export default ${JSON.stringify(files)};`;
    },
    configureServer(server) {
      const refresh = (file) => {
        if (!path.resolve(file).startsWith(root)) return;
        const module = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.add(root);
      server.watcher.on('add', refresh);
      server.watcher.on('unlink', refresh);
    },
  };
}
