import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const ContentListPage = lazy(() => import('./pages/ContentListPage.jsx'));
const ContentDetailPage = lazy(() => import('./pages/ContentDetailPage.jsx'));
const ResumePage = lazy(() => import('./pages/ResumePage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const SearchPage = lazy(() => import('./pages/SearchPage.jsx'));

function App() {
    return (
        <HelmetProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <ScrollToTop />
                    <a href="#main-content" className="skip-to-content">
                        Skip to main content
                    </a>
                    <div className="flex min-h-screen flex-col bg-page text-fg">
                        <Header />
                        <main id="main-content" className="flex-grow" tabIndex={-1}>
                            <Suspense fallback={<PageLoader />}>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route
                                        path="/articles"
                                        element={<ContentListPage contentType="articles" />}
                                    />
                                    <Route
                                        path="/articles/:slug"
                                        element={<ContentDetailPage contentType="articles" />}
                                    />
                                    <Route
                                        path="/projects"
                                        element={<ContentListPage contentType="projects" />}
                                    />
                                    <Route
                                        path="/projects/:slug"
                                        element={<ContentDetailPage contentType="projects" />}
                                    />
                                    <Route path="/resume" element={<ResumePage />} />
                                    <Route path="/search" element={<SearchPage />} />
                                    <Route path="*" element={<NotFoundPage />} />
                                </Routes>
                            </Suspense>
                        </main>
                        <Footer />
                    </div>
                    <Analytics />
                </BrowserRouter>
            </ThemeProvider>
        </HelmetProvider>
    );
}

export default App;
