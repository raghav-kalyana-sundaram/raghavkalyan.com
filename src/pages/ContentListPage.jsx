import { Link } from 'react-router-dom';
import { getContentByType } from '../utils/content';

const ContentListPage = ({ contentType }) => {
    // Get all content for the type, which is already sorted by date
    const allContentForType = getContentByType(contentType);
    // Slice the most recent 5 items
    const content = allContentForType.slice(0, 5);

    const pageTitle = contentType.charAt(0).toUpperCase() + contentType.slice(1);

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Recent {pageTitle}</h1>
            {content.length > 0 ? (
                <div className="grid gap-6">
                    {content.map(({ slug, title, excerpt, date }) => (
                        <article key={slug} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <Link to={`/${contentType}/${slug}`} className="block">
                                <h2 className="text-2xl font-bold text-primary-link hover:underline mb-2">
                                    {title}
                                </h2>
                                <p className="text-gray-600 mb-3">{excerpt}</p>
                                <time className="text-sm text-gray-500">
                                    {new Date(date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </time>
                            </Link>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600 mb-4">
                        No {contentType} found. Add some markdown files to <code className="bg-gray-100 px-2 py-1 rounded">src/content/{contentType}</code> to see them here.
                    </p>
                    <Link to="/" className="text-primary-link hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ContentListPage; 