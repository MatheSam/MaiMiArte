import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function updateDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) { updateDirectory(path); continue; }
    if (!path.endsWith('.tsx') || entry.name === 'icons.tsx') continue;
    let source = readFileSync(path, 'utf8');
    if (!source.includes('<Arrow')) continue;
    source = source.replace('<Palette className="project-palette"/><Arrow diagonal/>', '<Palette className="project-palette"/>');
    source = source.replace(/<Arrow(?: diagonal)?\/>/g, '<Palette/>');
    source = source.replace(/import \{([^}]+)\} from ('(?:\.\/icons|@\/components\/icons)');/g, (_match, names, module) => {
      const imports = names.split(',').map(name => name.trim()).filter(name => name !== 'Arrow');
      if (!imports.includes('Palette')) imports.push('Palette');
      return `import { ${imports.join(', ')} } from ${module};`;
    });
    writeFileSync(path, source);
  }
}
updateDirectory('src');
