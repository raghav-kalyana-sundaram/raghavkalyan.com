const PageLoader = () => (
    <div className="flex flex-1 min-h-[40vh] items-center justify-center" aria-busy="true" aria-label="Loading">
        <div
            className="h-10 w-10 rounded-full border-2 border-[var(--border)] border-t-[var(--accent)] motion-safe:animate-spin"
            role="presentation"
        />
    </div>
);

export default PageLoader;
