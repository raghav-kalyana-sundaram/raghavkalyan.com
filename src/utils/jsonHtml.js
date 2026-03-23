/**
 * Serialize JSON for safe embedding in HTML (e.g. application/ld+json).
 * Prevents closing the script element via sequences like </script> in string values.
 */
export function serializeJsonForHtml(value) {
    return JSON.stringify(value)
        .replace(/</g, '\\u003c')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
}
