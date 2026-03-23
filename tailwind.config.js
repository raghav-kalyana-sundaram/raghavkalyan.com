import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: 'var(--page)',
        surface: 'var(--surface)',
        'surface-muted': 'var(--surface-muted)',
        elevated: 'var(--elevated)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        subtle: 'var(--subtle)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'on-accent': 'var(--on-accent)',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--fg)',
            '--tw-prose-headings': 'var(--fg)',
            '--tw-prose-links': 'var(--accent)',
            '--tw-prose-bold': 'var(--fg)',
            '--tw-prose-quotes': 'var(--muted)',
            '--tw-prose-quote-borders': 'var(--accent)',
            '--tw-prose-code': 'var(--fg)',
            '--tw-prose-pre-code': 'var(--code-fg)',
            '--tw-prose-pre-bg': 'var(--code-bg)',
            '--tw-prose-hr': 'var(--border)',
            '--tw-prose-th-borders': 'var(--border)',
            '--tw-prose-td-borders': 'var(--border)',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [typography],
};
