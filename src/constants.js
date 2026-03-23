export const SUBSTACK_URL = 'https://raghavkalyan.substack.com/';
export const SITE_NAME = 'Raghav Kalyan';
export const SITE_DESCRIPTION =
    'Articles and projects on technology, learning, and ideas — plus updates on Substack.';
export const DEFAULT_OG_IMAGE = '/og-default.svg';

/** Single source for profile links (footer, JSON-LD sameAs). */
export const SOCIAL_PROFILES = [
    { name: 'GitHub', url: 'https://github.com/raghav-kalyana-sundaram' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/raghav-kalyan-4b7654287/' },
    { name: 'Twitter', url: 'https://x.com/raghavkalyan_' },
    { name: 'YouTube', url: 'https://www.youtube.com/@raghavkalyan17' },
    { name: 'Instagram', url: 'https://www.instagram.com/raghav._kalyan/' },
];

export const PROFILE_SAME_AS = SOCIAL_PROFILES.map((p) => p.url);

/**
 * Origin for canonical + Open Graph when sharing from production.
 * Set VITE_SITE_URL=https://raghavkalyan.com in .env for stable OG URLs off localhost.
 */
export function getCanonicalOrigin() {
    const env =
        typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL
            ? String(import.meta.env.VITE_SITE_URL).replace(/\/$/, '')
            : '';

    if (typeof window !== 'undefined') {
        const { hostname, origin } = window.location;
        if (hostname === 'localhost' || hostname === '127.0.0.1') return origin;
        if (env && /^https?:\/\//.test(env)) return env;
        return origin;
    }

    return env && /^https?:\/\//.test(env) ? env : 'https://raghavkalyan.com';
}
