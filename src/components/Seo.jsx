import { Helmet } from 'react-helmet-async';
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, getCanonicalOrigin } from '../constants';
import { serializeJsonForHtml } from '../utils/jsonHtml';

function absoluteUrl(pathOrUrl, origin) {
    if (!pathOrUrl) return null;
    if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl;
    const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
    return `${origin}${path}`;
}

/**
 * @param {object} props
 * @param {string} [props.title]
 * @param {string} [props.description]
 * @param {string} [props.image] — path or absolute URL
 * @param {string} [props.path] — pathname for canonical, e.g. /articles/foo
 * @param {string} [props.type]
 * @param {object|object[]} [props.jsonLd] — JSON-LD object(s) for <script type="application/ld+json">
 */
export default function Seo({ title, description, image, path = '', type = 'website', jsonLd = null }) {
    const origin = getCanonicalOrigin();
    const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Writing & projects`;
    const desc = description || SITE_DESCRIPTION;
    const ogImage = absoluteUrl(image || DEFAULT_OG_IMAGE, origin);
    const pathname =
        typeof window !== 'undefined' ? path || window.location.pathname || '/' : path || '/';
    const url = `${origin}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;

    const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

    return (
        <Helmet prioritizeSeoTags>
            <title>{pageTitle}</title>
            <meta name="description" content={desc} />
            <link rel="canonical" href={url} />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={desc} />
            {ogImage ? <meta property="og:image" content={ogImage} /> : null}
            <meta property="og:url" content={url} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={desc} />
            {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
            {jsonLdArray.map((data, i) => (
                <script key={i} type="application/ld+json">
                    {serializeJsonForHtml(data)}
                </script>
            ))}
        </Helmet>
    );
}
