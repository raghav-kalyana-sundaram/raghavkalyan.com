import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from '../components/SocialLinks';
import Seo from '../components/Seo';
import {
    getContentByType,
    getCuratedArticleSlugs,
    getCuratedArticles,
    getHeroArticle,
    getHeroImageUrlForSlug,
} from '../utils/content';
import { PROFILE_SAME_AS, SITE_DESCRIPTION, SITE_NAME, SUBSTACK_URL, getCanonicalOrigin } from '../constants';
import { formatPostDateDisplay, parsePostDate } from '../utils/date';
import { useReveal } from '../hooks/useReveal';

function RevealHeading({ as = 'h2', className = '', children }) {
    const ref = useReveal();
    return React.createElement(as, { ref, className }, children);
}

const heroCtaClassName =
    'inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent md:w-auto md:min-w-[44px]';

/** Primary CTA: do not reuse heroCtaClassName — its `text-fg` can override `text-on-accent` in Tailwind’s CSS order. */
const heroSubstackCtaClassName =
    'inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-transparent bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent shadow-sm transition-colors hover:border-white/20 hover:bg-accent-hover hover:text-on-accent dark:border-white/15 dark:shadow-none md:w-auto md:min-w-[44px]';

const HomePage = () => {
    const heroArticle = getHeroArticle();
    const curated = getCuratedArticles();
    const curatedSlugSet = useMemo(() => new Set(getCuratedArticleSlugs()), []);
    const allArticles = getContentByType('articles');
    const latestArticles = allArticles.filter((a) => !curatedSlugSet.has(a.slug)).slice(0, 8);
    const projects = getContentByType('projects').slice(0, 8);

    const [heroImage, setHeroImage] = useState(null);
    useEffect(() => {
        if (!heroArticle?.slug) {
            setHeroImage(null);
            return;
        }
        let cancelled = false;
        getHeroImageUrlForSlug(heroArticle.slug).then((url) => {
            if (!cancelled) setHeroImage(url);
        });
        return () => {
            cancelled = true;
        };
    }, [heroArticle?.slug]);

    const origin = getCanonicalOrigin();
    const jsonLd = useMemo(
        () => [
            {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: SITE_NAME,
                url: `${origin}/`,
                sameAs: PROFILE_SAME_AS,
            },
            {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: SITE_NAME,
                url: `${origin}/`,
                description: SITE_DESCRIPTION,
                potentialAction: {
                    '@type': 'SearchAction',
                    target: `${origin}/search?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                },
            },
        ],
        [origin],
    );

    return (
        <>
            <Seo path="/" jsonLd={jsonLd} />
            <section className="relative overflow-hidden border-b border-border">
                <div
                    className="pointer-events-none absolute inset-0 opacity-90 dark:opacity-[0.38]"
                    aria-hidden
                    style={{
                        background: `
              radial-gradient(ellipse 85% 55% at 15% -10%, var(--hero-mesh-a), transparent 55%),
              radial-gradient(ellipse 70% 45% at 95% 5%, var(--hero-mesh-b), transparent 50%),
              radial-gradient(ellipse 50% 40% at 50% 100%, var(--surface-muted), transparent 60%)
            `,
                    }}
                />
                <div className="relative container mx-auto px-6 py-16 md:py-24 lg:py-28">
                    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
                        <div className="lg:col-span-7">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
                                Raghav Kalyan
                            </p>
                            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-fg md:text-5xl lg:text-[3.25rem]">
                                Personal essays on technology, learning, and craft.
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                                I write for readers who like depth and for people skimming my work—recruiters
                                included. Long posts live here in full; I also send updates on{' '}
                                <a href={SUBSTACK_URL} className="font-semibold text-accent underline-offset-2 hover:underline">
                                    Substack
                                </a>
                                . If one thing is useful: subscribe there, then explore projects and articles
                                below.
                            </p>
                            <div className="mt-8 grid grid-cols-2 gap-3 md:flex md:flex-wrap md:items-center">
                                <a
                                    href={SUBSTACK_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={heroSubstackCtaClassName}
                                >
                                    Subscribe on Substack
                                    <svg
                                        className="h-4 w-4 shrink-0 opacity-95"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        aria-hidden
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                        />
                                    </svg>
                                    <span className="sr-only">(opens in new tab)</span>
                                </a>
                                <Link to="/projects" className={heroCtaClassName}>
                                    Projects
                                </Link>
                                <Link to="/articles" className={heroCtaClassName}>
                                    Articles
                                </Link>
                                <Link to="/resume" className={heroCtaClassName}>
                                    Résumé
                                </Link>
                            </div>
                            <div className="mt-10">
                                <SocialLinks className="justify-start" />
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            {heroArticle ? (
                                <div className="overflow-hidden rounded-2xl border border-border bg-elevated shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] dark:shadow-none">
                                    <Link
                                        to={`/articles/${heroArticle.slug}`}
                                        className="group block focus-visible:outline-none"
                                    >
                                        <div className="relative aspect-[4/3] w-full bg-surface-muted">
                                            {heroImage ? (
                                                <img
                                                    src={heroImage}
                                                    alt=""
                                                    fetchPriority="high"
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                                                />
                                            ) : (
                                                <div
                                                    className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-muted to-page px-6 text-center font-display text-lg text-muted"
                                                    aria-hidden
                                                >
                                                    Featured story
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                                                Featured read
                                            </p>
                                            <h2 className="mt-2 font-display text-xl font-semibold text-fg transition-colors group-hover:text-accent md:text-2xl">
                                                {heroArticle.title}
                                            </h2>
                                            {heroArticle.excerpt ? (
                                                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                                                    {heroArticle.excerpt}
                                                </p>
                                            ) : null}
                                            <span className="mt-4 inline-flex items-center text-sm font-semibold text-accent">
                                                Read
                                                <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                                                    →
                                                </span>
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-border bg-surface-muted/50 p-8 text-muted">
                                    Add article slugs to <code className="text-fg">src/config/home-curated.json</code> to
                                    feature a post here.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-b border-border bg-page py-16 md:py-20">
                <div className="container mx-auto px-6">
                    <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <RevealHeading className="font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl lg:text-4xl">
                                Projects
                            </RevealHeading>
                            <p className="mt-2 max-w-xl text-base text-muted md:text-lg">
                                Deeper dives, experiments, and work I want in the spotlight.
                            </p>
                        </div>
                        <Link
                            to="/projects"
                            className="shrink-0 text-sm font-semibold text-accent hover:underline"
                        >
                            All projects →
                        </Link>
                    </div>
                    {projects.length > 0 ? (
                        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                            {projects.map((p) => (
                                <li key={p.slug}>
                                    <Link
                                        to={`/projects/${p.slug}`}
                                        className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-accent dark:bg-elevated dark:hover:border-accent/70"
                                    >
                                        <h3 className="font-display text-lg font-semibold text-fg group-hover:text-accent">
                                            {p.title}
                                        </h3>
                                        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                                            {p.excerpt}
                                        </p>
                                        <span className="mt-5 text-sm font-medium text-accent">Open project →</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted">No projects yet.</p>
                    )}
                </div>
            </section>

            <section className="border-b border-border py-16 md:py-20">
                <div className="container mx-auto px-6">
                    <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <RevealHeading className="font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                                Writing
                            </RevealHeading>
                            <p className="mt-2 max-w-2xl text-muted">
                                Picks if you&apos;re new here, then the newest posts. The full archive (and search) live
                                on the articles page.
                            </p>
                        </div>
                        <Link
                            to="/articles"
                            className="shrink-0 text-sm font-semibold text-accent hover:underline"
                        >
                            All articles →
                        </Link>
                    </div>

                    {curated.length > 0 ? (
                        <>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-subtle">Picked for you</h3>
                            <ul className="mt-4 space-y-0 divide-y divide-border border-y border-border">
                                {curated.map((item) => {
                                    const postDate = parsePostDate(item.date);
                                    return (
                                        <li key={item.slug}>
                                            <Link
                                                to={`/articles/${item.slug}`}
                                                className="group flex flex-col gap-1 py-5 transition-colors hover:bg-surface-muted/40 md:flex-row md:items-baseline md:justify-between md:gap-8 md:px-3"
                                            >
                                                <span className="font-display text-lg font-semibold text-fg group-hover:text-accent md:max-w-[70%]">
                                                    {item.title}
                                                </span>
                                                {postDate ? (
                                                    <time className="shrink-0 text-sm text-subtle" dateTime={postDate.toISOString()}>
                                                        {formatPostDateDisplay(postDate)}
                                                    </time>
                                                ) : null}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    ) : null}

                    <h3
                        className={`text-sm font-semibold uppercase tracking-wider text-subtle ${curated.length ? 'mt-14' : ''}`}
                    >
                        Latest
                    </h3>
                    {latestArticles.length > 0 ? (
                        <ul className="mt-4 space-y-0 divide-y divide-border border-y border-border">
                            {latestArticles.map((item) => {
                                const postDate = parsePostDate(item.date);
                                return (
                                <li key={item.slug}>
                                    <Link
                                        to={`/articles/${item.slug}`}
                                        className="group block py-5 transition-colors hover:bg-surface-muted/40 md:px-3"
                                    >
                                        <h3 className="font-display text-lg font-semibold text-fg group-hover:text-accent">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-sm text-subtle">
                                            {postDate ? (
                                                <time dateTime={postDate.toISOString()}>
                                                    {formatPostDateDisplay(postDate)}
                                                </time>
                                            ) : null}
                                            {item.tags?.length ? (
                                                <>
                                                    {' '}
                                                    <span className="text-muted">·</span>{' '}
                                                    {item.tags.map((tag, i) => (
                                                        <span key={`${tag}-${i}`}>
                                                            {i > 0 ? ', ' : ''}
                                                            <span className="text-muted">{tag}</span>
                                                        </span>
                                                    ))}
                                                </>
                                            ) : null}
                                            {item.readingTimeMinutes ? (
                                                <>
                                                    {' '}
                                                    <span className="text-muted">·</span>{' '}
                                                    <span className="text-muted">{item.readingTimeMinutes} min read</span>
                                                </>
                                            ) : null}
                                        </p>
                                        {item.excerpt ? (
                                            <p className="mt-2 line-clamp-2 text-sm text-muted">{item.excerpt}</p>
                                        ) : null}
                                    </Link>
                                </li>
                            );
                            })}
                        </ul>
                    ) : curated.length ? (
                        <p className="mt-4 text-sm text-muted">No other articles yet beyond the picks above.</p>
                    ) : (
                        <p className="mt-4 text-muted">No articles yet.</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default HomePage;
