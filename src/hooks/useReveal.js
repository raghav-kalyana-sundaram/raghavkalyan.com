import { useEffect, useRef } from 'react';

export function useReveal(options = {}) {
    const ref = useRef(null);
    const { rootMargin = '0px 0px -8% 0px', threshold = 0.08 } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            el.classList.add('is-visible');
            return;
        }

        el.classList.add('js-reveal');
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            },
            { rootMargin, threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [rootMargin, threshold]);

    return ref;
}
