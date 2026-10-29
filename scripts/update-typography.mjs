import { readFileSync, writeFileSync } from 'node:fs';
const path = 'src/app/globals.css';
const css = readFileSync(path, 'utf8').replace(/font-size:\s*([^;}]+)/g, (_, value) =>
  `font-size: ${value.replace(/(\d*\.?\d+)px/g, (_match, size) => `${Math.max(0.8, Number(size) / 16)}rem`)}`,
);
writeFileSync(path, css);
