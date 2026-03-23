import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import { markdownSanitizeSchema } from '../utils/rehypeSanitizeSchema';

const rehypePlugins = [rehypeRaw, rehypeHighlight, rehypeSlug, [rehypeSanitize, markdownSanitizeSchema]];

export default function MarkdownBody({ children }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={rehypePlugins}
            components={{
                a({ href, children, ...props }) {
                    const h = typeof href === 'string' ? href : '';
                    const external =
                        h.startsWith('http://') ||
                        h.startsWith('https://') ||
                        h.startsWith('//') ||
                        h.startsWith('mailto:') ||
                        h.startsWith('tel:');
                    return (
                        <a
                            {...props}
                            href={href}
                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                            {children}
                        </a>
                    );
                },
                img({ src, alt, ...props }) {
                    return (
                        <img
                            src={src}
                            alt={alt || ''}
                            loading="lazy"
                            decoding="async"
                            className="my-6 w-full max-w-full rounded-lg border border-[var(--border)]"
                            {...props}
                        />
                    );
                },
                iframe({ src, title, width, height, allow, allowFullScreen, ...props }) {
                    return (
                        <span className="my-8 block w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] aspect-video">
                            <iframe
                                src={src}
                                title={title || 'Embedded video'}
                                width={width || '560'}
                                height={height || '315'}
                                allow={allow}
                                allowFullScreen={allowFullScreen}
                                loading="lazy"
                                sandbox="allow-scripts allow-same-origin allow-presentation"
                                className="h-full w-full"
                                {...props}
                            />
                        </span>
                    );
                },
            }}
        >
            {children}
        </ReactMarkdown>
    );
}
