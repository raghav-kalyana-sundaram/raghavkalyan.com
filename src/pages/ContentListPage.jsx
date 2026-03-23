import { Link, useSearchParams } from 'react-router-dom';
import { getAllArticleTags, getContentByType } from '../utils/content';
import Seo from '../components/Seo';
import { formatPostDateDisplay, parsePostDate } from '../utils/date';

function ArticlesIndex() {
    const [params] = useSearchParams();
    const activeTag = params.get('tag')?.trim() || null;
    const all = getContentByType('articles');
    const tags = getAllArticleTags();
    const filtered = activeTag
        ? all.filter((a) => (a.tags || []).some((t) => t === activeTag))
        : all;

    return (
        <>
            <Seo title="Articles" description="All articles — filter by category." path="/articles" />
            <div className="container mx-auto max-w-3xl px-6 py-12 md:py-16">
                <h1 className="font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl">Articles</h1>
                <p className="mt-3 text-lg text-muted">
                    Long-form writing. Use categories to narrow the list.
                </p>

                <div className="mt-10 flex flex-wrap items-baseline gap-x-2 gap-y-2 text-sm leading-relaxed">
                    <span className="font-semibold text-fg">Category:</span>
                    <Link
                        to="/articles"
                        className={`rounded px-1.5 py-0.5 transition-colors ${
                            !activeTag ? 'bg-surface-muted font-semibold text-accent' : 'text-muted hover:text-accent'
                        }`}
                    >
                        All
                    </Link>
                    {tags.map((tag) => (
                        <Link
                            key={tag}
                            to={`/articles?tag=${encodeURIComponent(tag)}`}
                            className={`rounded px-1.5 py-0.5 transition-colors ${
                                activeTag === tag
                                    ? 'bg-surface-muted font-semibold text-accent'
                                    : 'text-muted hover:text-accent'
                            }`}
                        >
                            {tag}
                        </Link>
                    ))}
                </div>

                {filtered.length > 0 ? (
                    <div className="mt-12 space-y-10">
                        {filtered.map(({ slug, title, excerpt, date, tags: postTags, readingTimeMinutes }) => {
                            const postDate = parsePostDate(date);
                            return (
                            <article key={slug} className="border-b border-border pb-10 last:border-0">
                                <h2 className="font-display text-2xl font-semibold tracking-tight">
                                    <Link to={`/articles/${slug}`} className="text-fg hover:text-accent">
                                        {title}
                                    </Link>
                                </h2>
                                <p className="mt-2 text-sm text-subtle">
                                    {postDate ? (
                                        <time dateTime={postDate.toISOString()}>{formatPostDateDisplay(postDate)}</time>
                                    ) : null}
                                    {readingTimeMinutes ? (
                                        <>
                                            {' '}
                                            · {readingTimeMinutes} min read
                                        </>
                                    ) : null}
                                    {postTags?.length ? (
                                        <>
                                            {' '}
                                            <span className="text-muted">in</span>{' '}
                                            {postTags.map((tag, i) => (
                                                <span key={`${tag}-${i}`}>
                                                    {i > 0 ? ', ' : ''}
                                                    <Link
                                                        to={`/articles?tag=${encodeURIComponent(tag)}`}
                                                        className="text-muted hover:text-accent"
                                                    >
                                                        {tag}
                                                    </Link>
                                                </span>
                                            ))}
                                        </>
                                    ) : null}
                                </p>
                                {excerpt ? <p className="mt-4 text-base leading-relaxed text-muted">{excerpt}</p> : null}
                            </article>
                        );
                        })}
                    </div>
                ) : (
                    <div className="mt-12 rounded-xl border border-dashed border-border bg-surface-muted/30 p-8 text-center text-muted">
                        <p>No articles in this category yet.</p>
                        <Link to="/articles" className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
                            Clear filter
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

function ProjectsIndex() {
    const projects = getContentByType('projects');

    return (
        <>
            <Seo title="Projects" description="Projects and write-ups." path="/projects" />
            <div className="container mx-auto max-w-3xl px-6 py-12 md:py-16">
                <h1 className="font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl">Projects</h1>
                <p className="mt-3 text-lg text-muted">Notes, experiments, and deeper dives.</p>
                {projects.length > 0 ? (
                    <div className="mt-12 space-y-10">
                        {projects.map(({ slug, title, excerpt, date, readingTimeMinutes }) => {
                            const postDate = parsePostDate(date);
                            return (
                            <article key={slug} className="border-b border-border pb-10 last:border-0">
                                <h2 className="font-display text-2xl font-semibold tracking-tight">
                                    <Link to={`/projects/${slug}`} className="text-fg hover:text-accent">
                                        {title}
                                    </Link>
                                </h2>
                                <p className="mt-2 text-sm text-subtle">
                                    {postDate ? (
                                        <time dateTime={postDate.toISOString()}>{formatPostDateDisplay(postDate)}</time>
                                    ) : null}
                                    {readingTimeMinutes ? (
                                        <>
                                            {' '}
                                            · {readingTimeMinutes} min read
                                        </>
                                    ) : null}
                                </p>
                                {excerpt ? <p className="mt-4 text-base leading-relaxed text-muted">{excerpt}</p> : null}
                            </article>
                        );
                        })}
                    </div>
                ) : (
                    <p className="mt-12 text-muted">No projects yet.</p>
                )}
            </div>
        </>
    );
}

const ContentListPage = ({ contentType }) => {
    if (contentType === 'articles') return <ArticlesIndex />;
    if (contentType === 'projects') return <ProjectsIndex />;
    return null;
};

export default ContentListPage;
