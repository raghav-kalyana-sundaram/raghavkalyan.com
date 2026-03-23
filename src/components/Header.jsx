import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SUBSTACK_URL } from '../constants';
import { useTheme } from '../context/useTheme';

const MOBILE_NAV_ID = 'mobile-primary-nav';

const navClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors min-h-11 flex items-center px-1 border-b-2 -mb-[2px] ${
        isActive ? 'border-accent text-fg' : 'border-transparent text-muted hover:text-fg'
    }`;

const themeToggleLabel = (theme) =>
    theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

function ThemeToggleButton({ theme, onToggle, className }) {
    return (
        <button type="button" onClick={onToggle} className={className} aria-label={themeToggleLabel(theme)}>
            {theme === 'dark' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            )}
        </button>
    );
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const menuButtonRef = useRef(null);
    const panelRef = useRef(null);

    const linkMobile = ({ isActive }) =>
        `block rounded-lg py-3 px-3 text-base font-semibold ${
            isActive ? 'bg-surface-muted text-accent' : 'text-fg hover:bg-surface-muted'
        }`;

    useEffect(() => {
        if (!isOpen) return undefined;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                menuButtonRef.current?.focus();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !panelRef.current) return;
        const focusable = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
        const first = focusable[0];
        first?.focus();
    }, [isOpen]);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-page/85 backdrop-blur-md print:hidden dark:bg-page/92 dark:backdrop-saturate-[1.15]">
            <div className="container mx-auto flex items-center justify-between gap-4 px-6 py-3.5">
                <Link
                    to="/"
                    className="font-display text-lg font-semibold tracking-tight text-fg transition-colors hover:text-accent md:text-xl"
                >
                    Raghav Kalyan
                </Link>

                <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
                    <NavLink to="/articles" className={navClass}>
                        Articles
                    </NavLink>
                    <NavLink to="/projects" className={navClass}>
                        Projects
                    </NavLink>
                    <NavLink to="/resume" className={navClass}>
                        Résumé
                    </NavLink>
                    <NavLink to="/search" className={navClass}>
                        Search
                    </NavLink>
                    <a
                        href={SUBSTACK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-muted transition-colors hover:text-accent"
                    >
                        Subscribe
                    </a>
                    <ThemeToggleButton
                        theme={theme}
                        onToggle={toggleTheme}
                        className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-fg transition-colors hover:border-accent hover:text-accent"
                    />
                </nav>

                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggleButton
                        theme={theme}
                        onToggle={toggleTheme}
                        className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-fg"
                    />
                    <button
                        ref={menuButtonRef}
                        type="button"
                        onClick={() => setIsOpen((o) => !o)}
                        className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-fg"
                        aria-expanded={isOpen}
                        aria-controls={MOBILE_NAV_ID}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen ? (
                <div className="border-t border-border bg-page md:hidden">
                    <nav
                        ref={panelRef}
                        id={MOBILE_NAV_ID}
                        className="flex flex-col px-6 py-3"
                        aria-label="Mobile primary"
                    >
                        <NavLink to="/articles" className={linkMobile} onClick={() => setIsOpen(false)}>
                            Articles
                        </NavLink>
                        <NavLink to="/projects" className={linkMobile} onClick={() => setIsOpen(false)}>
                            Projects
                        </NavLink>
                        <NavLink to="/resume" className={linkMobile} onClick={() => setIsOpen(false)}>
                            Résumé
                        </NavLink>
                        <NavLink to="/search" className={linkMobile} onClick={() => setIsOpen(false)}>
                            Search
                        </NavLink>
                        <a
                            href={SUBSTACK_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg py-3 px-3 text-base font-semibold text-accent"
                            onClick={() => setIsOpen(false)}
                        >
                            Subscribe
                        </a>
                    </nav>
                </div>
            ) : null}
        </header>
    );
};

export default Header;
