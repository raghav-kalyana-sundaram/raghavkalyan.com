import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { getSearchDocuments } from '../utils/content';

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(() => searchParams.get('q') || '');

    useEffect(() => {
        setQuery(searchParams.get('q') || '');
    }, [searchParams]);

    const docs = getSearchDocuments();

    const committed = (searchParams.get('q') || '').trim().toLowerCase();

    const results = useMemo(() => {
        if (!committed) return [];
        const terms = committed.split(/\s+/).filter(Boolean);
        return docs.filter((d) => terms.every((t) => d.haystack.includes(t)));
    }, [docs, committed]);

    const onSubmit = (e) => {
        e.preventDefault();
        const q = query.trim();
        setSearchParams(q ? { q } : {});
    };

    return (
        <>
            <Seo title="Search" description="Search articles and projects on this site." path="/search" />
            <div className="container mx-auto max-w-2xl px-6 py-12 md:py-16">
                <h1 className="font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl">Search</h1>
                <p className="mt-3 text-lg text-muted">Find posts and projects by keyword (title, tags, or body).</p>

                <form onSubmit={onSubmit} className="mt-10" role="search">
                    <label htmlFor="site-search" className="sr-only">
                        Search query
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            id="site-search"
                            type="search"
                            name="q"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g. startup, music, React…"
                            className="min-h-11 w-full flex-1 rounded-lg border border-border bg-elevated px-4 py-2.5 text-fg placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent"
                            autoComplete="off"
                            spellCheck="false"
                        />
                        <button
                            type="submit"
                            className="min-h-11 shrink-0 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-hover"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {committed ? (
                    <div className="mt-12">
                        <p className="text-sm text-subtle">
                            {results.length} result{results.length === 1 ? '' : 's'}
                            {committed ? ` for “${searchParams.get('q')?.trim()}”` : ''}
                        </p>
                        <ul className="mt-6 space-y-6">
                            {results.map((r) => (
                                <li key={`${r.contentType}-${r.slug}`} className="border-b border-border pb-6">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                                        {r.contentType === 'articles' ? 'Article' : 'Project'}
                                    </p>
                                    <Link
                                        to={r.path}
                                        className="mt-1 block font-display text-xl font-semibold text-fg hover:text-accent"
                                    >
                                        {r.title}
                                    </Link>
                                    {r.excerpt ? <p className="mt-2 text-sm text-muted">{r.excerpt}</p> : null}
                                </li>
                            ))}
                        </ul>
                        {results.length === 0 ? (
                            <p className="mt-8 text-muted">No matches. Try different words or browse the archives.</p>
                        ) : null}
                    </div>
                ) : (
                    <p className="mt-10 text-sm text-muted">Type a word or phrase and press Search (or Enter).</p>
                )}
            </div>
        </>
    );
};

export default SearchPage;
