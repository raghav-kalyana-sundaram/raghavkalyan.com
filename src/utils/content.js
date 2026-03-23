import matter from 'gray-matter';
import curatedConfig from '../config/home-curated.json';
import { estimateReadingTimeMinutes, stripMarkdownLite } from './text';

const ALLOWED_TYPES = ['articles', 'projects'];
/** Segment index of `articles` | `projects` in glob keys like `../content/<type>/<file>.md` */
const GLOB_TYPE_SEGMENT = 2;

export const normalizeTags = (tags) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags.map(String).map((t) => t.trim()).filter(Boolean);
    return String(tags)
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
};

function warnMissingFrontmatter(path) {
    console.warn(`Missing required frontmatter in ${path}: title, date, or excerpt`);
}

function parseContentEntry(path, rawContent) {
    try {
        const { data, content: body } = matter(rawContent);
        const slug = path.split('/').pop().replace('.md', '');
        const contentType = path.split('/')[GLOB_TYPE_SEGMENT];

        if (!ALLOWED_TYPES.includes(contentType)) return null;

        if (!data.title || !data.date || !data.excerpt) {
            warnMissingFrontmatter(path);
            return null;
        }

        const tags = normalizeTags(data.tags);
        const listRecord = {
            slug,
            contentType,
            ...data,
            tags,
            cover: data.cover || data.image || null,
            readingTimeMinutes: estimateReadingTimeMinutes(body),
        };
        const haystack = [data.title, data.excerpt, tags.join(' '), stripMarkdownLite(body)].join('\n').toLowerCase();
        const searchDoc = {
            slug,
            contentType,
            title: data.title,
            excerpt: data.excerpt,
            tags,
            haystack,
            path: `/${contentType}/${slug}`,
        };
        return { listRecord, searchDoc };
    } catch (error) {
        console.error(`Error parsing frontmatter in ${path}:`, error);
        return null;
    }
}

function buildAllContentRecords() {
    try {
        const modules = import.meta.glob('../content/**/*.md', {
            eager: true,
            query: '?raw',
            import: 'default',
        });

        const list = [];
        const searchDocs = [];

        for (const [path, rawContent] of Object.entries(modules)) {
            const parsed = parseContentEntry(path, rawContent);
            if (!parsed) continue;
            list.push(parsed.listRecord);
            searchDocs.push(parsed.searchDoc);
        }

        list.sort((a, b) => new Date(b.date) - new Date(a.date));

        return { list, searchDocs };
    } catch (error) {
        console.error('Error fetching content:', error);
        return { list: [], searchDocs: [] };
    }
}

let contentBundleCache = null;

function getContentBundle() {
    if (!contentBundleCache) {
        contentBundleCache = buildAllContentRecords();
    }
    return contentBundleCache;
}

export const fetchAllContent = () => getContentBundle().list;

export const getContentByType = (contentType) => {
    return fetchAllContent().filter((item) => item.contentType === contentType);
};

export const getContentItem = (contentType, slug) => {
    return fetchAllContent().find((item) => item.contentType === contentType && item.slug === slug);
};

export const getAllArticleTags = () => {
    const articles = getContentByType('articles');
    const set = new Set();
    for (const a of articles) {
        for (const t of a.tags || []) set.add(t);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
};

export const getCuratedArticleSlugs = () => curatedConfig.curatedSlugs || [];

export const getCuratedArticles = () => {
    const slugs = getCuratedArticleSlugs();
    return slugs.map((slug) => getContentItem('articles', slug)).filter(Boolean);
};

export const getHeroArticle = () => {
    const slugs = getCuratedArticleSlugs();
    const first = slugs[0];
    if (!first) return null;
    return getContentItem('articles', first);
};

const FIRST_MD_IMAGE = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/;

export const extractFirstImageFromMarkdown = (markdown) => {
    if (!markdown) return null;
    const m = markdown.match(FIRST_MD_IMAGE);
    return m ? m[1] : null;
};

export async function getHeroImageUrlForSlug(slug) {
    const item = getContentItem('articles', slug);
    if (!item) return null;
    if (item.cover) return item.cover;
    try {
        const rawContentModule = await import(`../content/articles/${slug}.md?raw`);
        const { content, data } = matter(rawContentModule.default);
        if (data.cover || data.image) return data.cover || data.image;
        return extractFirstImageFromMarkdown(content);
    } catch {
        return null;
    }
}

/** Documents for client-side full-text search (title, excerpt, tags, body). */
export const getSearchDocuments = () => getContentBundle().searchDocs;
