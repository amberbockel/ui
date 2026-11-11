import content from './content.json';

// Copy captured from the old site sometimes lost the space after a full stop.
const tidy = (t) => t.replace(/([a-z])\.([A-Z])/g, '$1. $2').replace(/\s\.\s/g, '. ').replace(/\.\./g, '.');

export function sec(page, heading) {
  const s = content[page].sections.find((x) => x.heading.startsWith(heading));
  if (!s) throw new Error(`No section "${heading}" on ${page}`);
  return { ...s, paras: s.paras.map(tidy) };
}
export const meta = (page) => ({ title: content[page].title, description: content[page].description });
export const img = (name) => `/images/${name}`;
