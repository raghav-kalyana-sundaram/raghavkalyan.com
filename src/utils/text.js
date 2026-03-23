import Slugger from 'github-slugger';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

/** Rough plain-text length for search / reading time (strips most markdown noise). */
export function stripMarkdownLite(md) {
    if (!md) return '';
    let s = md;
    s = s.replace(/```[\s\S]*?```/g, ' ');
    s = s.replace(/`[^`]+`/g, ' ');
    s = s.replace(/!\[[^\]]*]\([^)]*\)/g, ' ');
    s = s.replace(/\[([^\]]+)]\([^)]*\)/g, '$1');
    s = s.replace(/^#{1,6}\s+/gm, '');
    s = s.replace(/[*_~>#]+/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
}

export function estimateReadingTimeMinutes(text) {
    const plain = stripMarkdownLite(text);
    const words = plain.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}

/**
 * TOC ids match `rehype-slug`: same `github-slugger` instance, document order, and plain
 * heading text as produced from the remark + GFM parse (aligned with `react-markdown`).
 *
 * @param {string} markdown
 * @returns {{ level: number, title: string, id: string }[]}
 */
export function extractMarkdownToc(markdown) {
    if (!markdown) return [];
    const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);
    const slugger = new Slugger();
    slugger.reset();
    const out = [];
    visit(tree, 'heading', (node) => {
        const text = toString(node);
        const id = slugger.slug(text);
        if ((node.depth === 2 || node.depth === 3) && text) {
            out.push({
                level: node.depth,
                title: text,
                id,
            });
        }
    });
    return out;
}
