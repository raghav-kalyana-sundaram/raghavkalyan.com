import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';
import { getContentItem } from '../utils/content';

const ContentDetailPage = ({ contentType }) => {
    const { slug } = useParams();
    const [pageContent, setPageContent] = useState('');
    const [metadata, setMetadata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            // Reset state for new content
            setLoading(true);
            setError(false);
            setPageContent('');
            setMetadata(null);

            try {
                // Get metadata from our pre-compiled content list for speed
                const contentItem = getContentItem(contentType, slug);
                
                // Dynamically import the markdown file's raw content
                const rawContentModule = await import(`../content/${contentType}/${slug}.md?raw`);
                const { content, data } = matter(rawContentModule.default);
                
                setPageContent(content);
                // Use pre-compiled metadata if available, otherwise fall back to parsed data
                setMetadata(contentItem || data);
                
            } catch (err) {
                setError(true);
                console.error(`Could not load content for ${contentType}/${slug}.md`, err);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [contentType, slug]); // Only re-run the effect if contentType or slug changes

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-link mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading content...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-6 py-12">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Content not found</h1>
                    <p className="text-gray-600 mb-6">The requested content could not be loaded.</p>
                    <div className="space-x-4">
                        <Link to="/" className="text-primary-link hover:underline">
                            ← Back to Home
                        </Link>
                        <Link to={`/${contentType}`} className="text-primary-link hover:underline">
                            View all {contentType}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto px-6 py-12">
                <article className="max-w-3xl mx-auto">
                    {/* Header with metadata */}
                    <header className="mb-12 text-center">
                        <nav className="mb-6 text-sm font-medium text-gray-500">
                            <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
                            <span className="mx-2 text-gray-400">/</span>
                            <Link to={`/${contentType}`} className="hover:text-gray-900 transition-colors capitalize">{contentType}</Link>
                        </nav>
                        
                        {metadata && (
                            <>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{metadata.title}</h1>
                                {metadata.excerpt && (
                                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{metadata.excerpt}</p>
                                )}
                                {metadata.date && (
                                    <time className="text-sm text-gray-500 mt-6 block">
                                        Published on {new Date(metadata.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                )}
                            </>
                        )}
                    </header>

                    {/* Content */}
                    <div className="prose prose-lg lg:prose-xl max-w-none prose-blockquote:border-primary-button prose-blockquote:text-gray-600 prose-blockquote:font-normal prose-blockquote:not-italic">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{pageContent}</ReactMarkdown>
                    </div>

                    {/* Footer navigation */}
                    <footer className="mt-16 text-center">
                        <Link to={`/${contentType}`} className="text-primary-link hover:underline font-semibold">
                            ← Back to all {contentType}
                        </Link>
                    </footer>
                </article>
            </div>
        </div>
    );
};

// To make Tailwind's typography plugin work with dynamically loaded markdown,
// we need to add a "prose" class to the container. We also need to install
// the typography plugin: npm install -D @tailwindcss/typography
// I'll add this to tailwind.config.js as well.
// For now, basic styling will apply, but typography will not be optimized.

export default ContentDetailPage; 