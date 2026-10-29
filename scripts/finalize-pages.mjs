import { writeFile } from 'node:fs/promises';

// Static hosts cannot run Next.js redirects. Resolve relative to the project URL.
await writeFile('out/index.html', '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=./pt/"><title>MaiMiArte</title></head><body><a href="./pt/">Entrar na MaiMiArte</a></body></html>');
await writeFile('out/.nojekyll', '');
