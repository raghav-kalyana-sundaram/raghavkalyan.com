import matter from 'gray-matter';

// This function fetches all markdown files, parses their frontmatter,
// and sorts them by date in descending order.
export const fetchAllContent = () => {
    try {
        // Use dynamic import to avoid build-time warnings
        const modules = import.meta.glob('../content/**/*.md', { 
            eager: true, 
            query: '?raw', 
            import: 'default' 
        });

        const content = Object.entries(modules)
            .map(([path, rawContent]) => {
                try {
                    const { data } = matter(rawContent);
                    const slug = path.split('/').pop().replace('.md', '');
                    const contentType = path.split('/')[2]; // e.g., 'articles', 'projects'

                    // Validate required frontmatter fields
                    if (!data.title || !data.date || !data.excerpt) {
                        console.warn(`Missing required frontmatter in ${path}: title, date, or excerpt`);
                        return null;
                    }

                    return {
                        slug,
                        contentType,
                        ...data,
                    };
                } catch (error) {
                    console.error(`Error parsing frontmatter in ${path}:`, error);
                    return null;
                }
            })
            .filter(Boolean); // Remove null entries

        // Sort by date, most recent first
        content.sort((a, b) => new Date(b.date) - new Date(a.date));

        return content;
    } catch (error) {
        console.error('Error fetching content:', error);
        return [];
    }
};

// Helper function to get content by type
export const getContentByType = (contentType) => {
    return fetchAllContent().filter(item => item.contentType === contentType);
};

// Helper function to get a single content item
export const getContentItem = (contentType, slug) => {
    return fetchAllContent().find(item => 
        item.contentType === contentType && item.slug === slug
    );
}; 