import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import resume from '../data/resume.json';

const ResumePage = () => {
    const experience = resume.experience ?? [];
    const education = resume.education ?? [];
    const skills = resume.skills ?? [];

    return (
        <>
            <Seo title="Résumé / CV" description={resume.summary} path="/resume" />
            <div className="container mx-auto max-w-3xl px-6 py-12 md:py-20 print:max-w-none print:py-8">
                <nav className="mb-10 text-sm text-muted print:hidden" aria-label="Breadcrumb">
                    <Link to="/" className="hover:text-accent">
                        Home
                    </Link>
                    <span className="mx-2 text-subtle">/</span>
                    <span className="text-subtle">Résumé</span>
                </nav>

                <article className="resume-print text-fg print:text-black">
                    <header className="border-b border-border pb-12 print:border-black/20">
                        <h1 className="font-display text-4xl font-semibold tracking-tight text-fg print:text-black md:text-5xl">
                            {resume.headline}
                        </h1>
                        <p className="mt-3 text-xl text-accent print:text-black">{resume.tagline}</p>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted print:text-neutral-800">
                            {resume.summary}
                        </p>
                    </header>

                    <section className="mt-14">
                        <h2 className="font-display text-2xl font-semibold text-fg print:text-black">Experience</h2>
                        <ul className="mt-8 space-y-12">
                            {experience.map((job, i) => (
                                <li key={i} className="border-l-2 border-accent/40 pl-6 print:border-black/30">
                                    <h3 className="font-display text-xl font-semibold text-fg print:text-black">{job.title}</h3>
                                    <p className="mt-1 text-sm font-medium text-accent print:text-black">{job.organization}</p>
                                    <p className="mt-1 text-sm text-subtle print:text-neutral-700">{job.period}</p>
                                    <ul className="mt-4 list-disc space-y-2 pl-5 text-muted print:text-neutral-800">
                                        {(job.bullets ?? []).map((b, j) => (
                                            <li key={j}>{b}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-16">
                        <h2 className="font-display text-2xl font-semibold text-fg print:text-black">Education</h2>
                        <ul className="mt-6 space-y-6">
                            {education.map((ed, i) => (
                                <li
                                    key={i}
                                    className="flex flex-col gap-1 border-b border-border pb-6 last:border-0 print:border-black/15"
                                >
                                    <span className="font-semibold text-fg print:text-black">{ed.degree}</span>
                                    <span className="text-muted print:text-neutral-800">{ed.school}</span>
                                    <span className="text-sm text-subtle print:text-neutral-700">{ed.period}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-16">
                        <h2 className="font-display text-2xl font-semibold text-fg print:text-black">Skills</h2>
                        <ul className="mt-6 flex flex-wrap gap-2">
                            {skills.map((s, si) => (
                                <li
                                    key={`${s}-${si}`}
                                    className="rounded-full border border-border bg-surface-muted px-4 py-1.5 text-sm text-muted print:border-black/25 print:bg-transparent print:text-black"
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="mt-16 border-t border-border pt-10 print:hidden">
                        <h2 className="font-display text-lg font-semibold text-fg">Résumé file</h2>
                        <p className="mt-2 max-w-xl text-sm text-muted">
                            Download a PDF if I&apos;ve uploaded one, or use your browser&apos;s print dialog to save this page
                            as PDF.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {resume.pdfUrl ? (
                                <a
                                    href={resume.pdfUrl}
                                    download
                                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-hover"
                                >
                                    Download PDF
                                </a>
                            ) : null}
                            <button
                                type="button"
                                onClick={() => window.print()}
                                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-fg hover:border-accent hover:text-accent"
                            >
                                Print / Save as PDF
                            </button>
                        </div>
                    </div>

                    {import.meta.env.DEV ? (
                        <p className="mt-10 text-sm text-subtle print:hidden">
                            Dev: edit{' '}
                            <code className="rounded bg-surface-muted px-1.5 py-0.5 text-fg">src/data/resume.json</code> to
                            update this page.
                        </p>
                    ) : null}
                </article>
        </div>
    </>
    );
};

export default ResumePage;
