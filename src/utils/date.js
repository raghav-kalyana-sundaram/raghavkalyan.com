const LONG_LOCALE_OPTS = { year: 'numeric', month: 'long', day: 'numeric' };

/** @param {unknown} value */
export function parsePostDate(value) {
    if (value == null || value === '') return null;
    const d = value instanceof Date ? value : new Date(String(value));
    return Number.isNaN(d.getTime()) ? null : d;
}

/** @param {unknown} value */
export function toIsoStringIfValid(value) {
    const d = parsePostDate(value);
    return d ? d.toISOString() : undefined;
}

/**
 * @param {unknown} value
 * @returns {string | null} Formatted date or null if invalid
 */
export function formatPostDateLong(value) {
    const d = parsePostDate(value);
    return d ? d.toLocaleDateString('en-US', LONG_LOCALE_OPTS) : null;
}

/** @param {Date} d — must be a valid Date */
export function formatPostDateDisplay(d) {
    return d.toLocaleDateString('en-US', LONG_LOCALE_OPTS);
}
