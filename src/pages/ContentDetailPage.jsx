import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import matter from 'gray-matter';
import { getContentItem } from '../utils/content';
import MarkdownBody from '../components/MarkdownBody';
import Seo from '../components/Seo';
import { SITE_NAME, getCanonicalOrigin } from '../constants';
import { formatPostDateDisplay, parsePostDate, toIsoStringIfValid } from '../utils/date';
import { extractMarkdownToc } from '../utils/text';

const ContentDetailPage = ({ contentType }) => {
    const { slug } = useParams();
    const [pageContent, setPageContent] = useState('');
    const [metadata, setMetadata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 420);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        let active = true;
        const run = async () => {
            setLoading(true);
            setError(false);
            setPageContent('');
            setMetadata(null);

            try {
                const contentItem = getContentItem(contentType, slug);
                const rawContentModule = await import(`../content/${contentType}/${slug}.md?raw`);
                const { content, data } = matter(rawContentModule.default);
                if (!active) return;

                setPageContent(content);
                setMetadata(
                    contentItem
                        ? { ...data, ...contentItem, tags: contentItem.tags || data.tags }
                        : { ...data, tags: data.tags },
                );
            } catch (err) {
                if (!active) return;
                setError(true);
                console.error(`Could not load content for ${contentType}/${slug}.md`, err);
            } finally {
                if (active) setLoading(false);
            }
        };

        run();
        return () => {
            active = false;
        };
    }, [contentType, slug]);

    const toc = useMemo(() => extractMarkdownToc(pageContent), [pageContent]);
    const readingMinutes = metadata?.readingTimeMinutes ?? null;
    const showToc = contentType === 'articles' && toc.length > 1 && (readingMinutes == null || readingMinutes >= 5);

    const articleJsonLd = useMemo(() => {
        if (contentType !== 'articles' || !metadata?.title) return null;
        const origin = getCanonicalOrigin();
        const path = `/articles/${slug}`;
        const url = `${origin}${path}`;
        const imagePath = metadata.cover || metadata.image || null;
        const imageUrl = imagePath
            ? imagePath.startsWith('http')
                ? imagePath
                : `${origin}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`
            : `${origin}/og-default.svg`;
        const datePublished = toIsoStringIfValid(metadata.date);
        return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: metadata.title,
            description: metadata.excerpt,
            datePublished,
            author: {
                '@type': 'Person',
                name: SITE_NAME,
                url: `${origin}/`,
            },
            publisher: {
                '@type': 'Person',
                name: SITE_NAME,
            },
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': url,
            },
            image: imageUrl,
            url,
        };
    }, [contentType, metadata, slug]);

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div
                        className="h-10 w-10 rounded-full border-2 border-border border-t-accent motion-safe:animate-spin"
                        role="status"
                        aria-label="Loading"
                    />
                    <p className="text-sm text-muted">Loading…</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto max-w-xl px-6 py-20 text-center">
                <h1 className="font-display text-2xl font-semibold text-fg">Page not found</h1>
                <p className="mt-3 text-muted">This post may have moved or doesn&apos;t exist.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold">
                    <Link to="/" className="text-accent hover:underline">
                        Home
                    </Link>
                    <Link to={`/${contentType}`} className="text-accent hover:underline">
                        All {contentType}
                    </Link>
                </div>
            </div>
        );
    }

    const label = contentType === 'articles' ? 'Articles' : 'Projects';
    const ogImage = metadata?.cover || metadata?.image || undefined;
    const articleDisplayDate = metadata?.date ? parsePostDate(metadata.date) : null;

    return (
        <>
            <Seo
                title={metadata?.title}
                description={metadata?.excerpt}
                image={ogImage}
                path={`/${contentType}/${slug}`}
                type={contentType === 'articles' ? 'article' : 'website'}
                jsonLd={articleJsonLd || undefined}
            />
            <article className="border-b border-border bg-page">
                <div className="container mx-auto max-w-3xl px-6 py-12 md:py-16">
                    <nav className="mb-10 text-sm text-muted print:hidden" aria-label="Breadcrumb">
                        <Link to="/" className="hover:text-accent">
                            Home
                        </Link>
                        <span className="mx-2 text-subtle">/</span>
                        <Link to={`/${contentType}`} className="hover:text-accent">
                            {label}
                        </Link>
                        <span className="mx-2 text-subtle">/</span>
                        <span className="text-subtle">{metadata?.title}</span>
                    </nav>

                    <header className="max-w-2xl">
                        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-fg md:text-5xl">
                            {metadata?.title}
                        </h1>
                        {metadata?.excerpt ? (
                            <p className="mt-5 text-lg leading-relaxed text-muted">{metadata.excerpt}</p>
                        ) : null}
                        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-subtle">
                            {articleDisplayDate ? (
                                <time dateTime={articleDisplayDate.toISOString()}>
                                    {formatPostDateDisplay(articleDisplayDate)}
                                </time>
                            ) : null}
                            {readingMinutes ? (
                                <>
                                    {metadata?.date ? <span aria-hidden> · </span> : null}
                                    <span>{readingMinutes} min read</span>
                                </>
                            ) : null}
                        </div>
                        {metadata?.tags?.length ? (
                            <ul className="mt-6 flex flex-wrap gap-2">
                                {metadata.tags.map((tag, tagIndex) => (
                                    <li key={`${tag}-${tagIndex}`}>
                                        {contentType === 'articles' ? (
                                            <Link
                                                to={`/articles?tag=${encodeURIComponent(tag)}`}
                                                className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                                            >
                                                {tag}
                                            </Link>
                                        ) : (
                                            <span className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs font-medium text-muted">
                                                {tag}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </header>

                    {showToc ? (
                        <nav
                            className="mt-12 rounded-xl border border-border bg-surface-muted/40 p-5 print:hidden md:p-6"
                            aria-label="On this page"
                        >
                            <p className="text-xs font-semibold uppercase tracking-wider text-accent">On this page</p>
                            <ul className="mt-3 space-y-2 border-l border-border pl-4 text-sm">
                                {toc.map((item) => (
                                    <li key={item.id} className={item.level === 3 ? 'ml-3' : ''}>
                                        <a href={`#${item.id}`} className="text-muted hover:text-accent">
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ) : null}

                    <div className="prose prose-lg mt-14 max-w-none prose-headings:font-display prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
                        <MarkdownBody>{pageContent}</MarkdownBody>
                    </div>

                    <footer className="mt-20 border-t border-border pt-10 print:hidden">
                        <Link
                            to={`/${contentType}`}
                            className="text-sm font-semibold text-accent hover:underline"
                        >
                            ← Back to all {label.toLowerCase()}
                        </Link>
                    </footer>
                </div>
            </article>

            {showTop ? (
                <button
                    type="button"
                    className="fixed bottom-6 right-6 z-40 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border bg-elevated/95 px-4 py-2 text-sm font-semibold text-fg shadow-lg backdrop-blur-sm transition-colors hover:border-accent hover:text-accent print:hidden"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    Top
                </button>
            ) : null}
        </>
    );
};

export default ContentDetailPage;
