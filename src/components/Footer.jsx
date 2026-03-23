import { Link } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import { SUBSTACK_URL } from '../constants';

const LINKEDIN_URL = 'https://www.linkedin.com/in/raghav-kalyan-4b7654287/';

const Footer = () => (
    <footer className="mt-auto border-t border-border bg-surface print:hidden">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
            <div>
                <p className="text-sm text-muted">
                    © {new Date().getFullYear()} Raghav Kalyan. All rights reserved.
                </p>
                <p className="mt-2 text-sm text-subtle">
                    <Link to="/articles" className="hover:text-accent">
                        Articles
                    </Link>
                    <span className="mx-2">·</span>
                    <Link to="/projects" className="hover:text-accent">
                        Projects
                    </Link>
                    <span className="mx-2">·</span>
                    <Link to="/search" className="hover:text-accent">
                        Search
                    </Link>
                    <span className="mx-2">·</span>
                    <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                        Substack
                    </a>
                </p>
                <p className="mt-3 text-sm text-subtle">
                    Professional inquiries:{' '}
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                        LinkedIn
                    </a>
                    <span className="sr-only"> (opens in new tab)</span>
                </p>
            </div>
            <SocialLinks className="justify-center md:justify-end" />
        </div>
    </footer>
);

export default Footer;
