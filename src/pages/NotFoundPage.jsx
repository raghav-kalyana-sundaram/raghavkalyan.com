import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

const NotFoundPage = () => (
    <>
        <Seo title="Page not found" description="The page you requested does not exist." />
        <div className="container mx-auto max-w-lg px-6 py-24 text-center md:py-32">
            <p className="font-display text-7xl font-semibold text-accent/90 md:text-8xl">404</p>
            <h1 className="mt-4 font-display text-2xl font-semibold text-fg md:text-3xl">This page isn&apos;t here</h1>
            <p className="mt-4 text-muted">
                The link may be broken, or the page was removed. Try the home page or the archive.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                    to="/"
                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
                >
                    Home
                </Link>
                <Link
                    to="/articles"
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
                >
                    Articles
                </Link>
            </div>
        </div>
    </>
);

export default NotFoundPage;
