/* eslint-disable react-refresh/only-export-components -- context + provider belong together */
import { createContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'light' || stored === 'dark') return stored;
        } catch {
            /* ignore */
        }
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
        const meta = document.getElementById('theme-color-meta');
        if (meta) {
            meta.setAttribute('content', theme === 'dark' ? '#1a1d24' : '#f2f4f8');
        }
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            /* ignore */
        }
    }, [theme]);

    const setTheme = (t) => setThemeState(t === 'light' ? 'light' : 'dark');
    const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
