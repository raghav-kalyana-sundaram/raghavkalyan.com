# Repository map — raghavkalyan.com

This document describes **structure**, **dependencies between areas**, and **where to focus deeper review**. It is not a style or UX critique. **§12 (synthesis and prioritization) is at the top**; §§1–8 are the structural map, §§9–11 are detailed audits.

---

## 12. Synthesis and prioritization

Cross-cutting consolidation of **§6–7** (map / legacy), **§9** (AUD), **§10** (COR), and **§11** (SEC).

---

### 12.1 Deduplicated / merged findings

These audit IDs describe the **same underlying issue** or should be **fixed in one change**:

| Canonical theme | Merged IDs | Notes |
|-----------------|------------|--------|
| **Markdown anchor policy** | COR-004, COR-005, SEC-004 | Same file (`MarkdownBody.jsx`): `external` detection, spread order, and `//` / scheme handling — address together. |
| **Invalid `date` handling** | COR-002, COR-010 | Same bad front matter: one path **throws** (JSON-LD), others show **“Invalid Date”** in lists — unify validation + formatting. |
| **Dual content pipelines** | AUD-001, COR-003 | One glob/parse path warns; the other **silently** drops rows — single builder fixes architecture and diagnostics. |
| **Repeated Markdown parse** | AUD-002, AUD-003 | Detail page + hero image both re-import/re-`matter` what the index already implies — same root cause as “fragmented content layer.” |
| **Raw HTML + XSS posture** | SEC-002, SEC-005, §5 “Security-sensitive areas”, AUD-013 | Sanitize allowlist + **no CSP** = defense-in-depth gap; MarkdownBody mixing policy and UI is the maintenance face of the same surface. |
| **SEO / origin strings** | AUD-007, part of AUD-009 | Duplicate fallbacks and scattered copy around `Seo` / `getCanonicalOrigin` / `index.html`. |

**Kept distinct** (same files but different failure modes): SEC-001 (JSON-in-HTML) vs SEC-002 (DOM XSS via markdown); COR-001 (race) vs COR-002 (date throw); COR-006 (TOC slug mismatch) vs slugging in markdown pipeline.

---

### 12.2 Clusters by root cause

| Root cause | Representative IDs | What to fix “once” |
|------------|-------------------|---------------------|
| **Fragmented content layer** | AUD-001,002,003,004,005,014; COR-003; §6 #2–3 | One glob + parse + projections (list / search / optional body); explicit path parsing; curated imports optional split. |
| **Detail route lifecycle** | COR-001,002; AUD-002 | Cancel or sequence async loads; validate dates before `toISOString`; reduce duplicate parse where possible. |
| **Markdown trust boundary** | SEC-002,003,004,005; COR-004,005; SEC-001 | Sanitize + CSP + safe JSON-LD serialization + consistent link component; iframe `sandbox`; optional allowlist shrink. |
| **Missing validation on author data** | COR-002,007,008,010; AUD-015; SEC-008 | Dates, resume JSON shape, React keys, YAML/parser upgrades / limits. |
| **Configuration & DRY drift** | AUD-006,007,008,009,010,011,012; §6 #1 | Single sources for social URLs, fonts, dates, theme boot notes, README/CONTENT_GUIDE vs code. |
| **Third-party / supply chain** | SEC-006,007 | Document `VITE_*` rules; optional self-hosted fonts / SRI. |

---

### 12.3 Ranked backlog

#### Critical now

| Item | IDs | Rationale |
|------|-----|-----------|
| **Safe JSON-LD in HTML** | SEC-001 | Documented **HTML/script breakout** from `</script>` in serialized JSON — real injection class for anyone who can change front matter. |
| **Stale async on article navigation** | COR-001 | Can show **wrong article** after fast navigation — silent, user-facing data corruption. |
| **Guard `toISOString()` on article JSON-LD** | COR-002 | **RangeError** bricks the article page on bad `date` YAML. |

#### Important soon

| Item | IDs | Rationale |
|------|-----|-----------|
| **Unify `content.js` pipelines + logging** | AUD-001, COR-003 | Stops search/list **drift** and silent drops; reduces double work. |
| **Markdown links: external detection + prop order** | COR-004, COR-005, SEC-004 | Single PR; security/consistency hardening. |
| **Shared safe date formatting + validation** | COR-010 (+ COR-002 alignment) | Removes “Invalid Date” in UI; aligns with JSON-LD guards. |
| **Content-Security-Policy** | SEC-005 | Defense in depth if sanitize or a dependency regresses. |
| **iframe `sandbox`** | SEC-003 | Reduces embed abuse without removing embeds. |
| **TOC vs rendered heading IDs** | COR-006 | Broken in-page nav on edge-case headings when TOC shows. |

#### Cleanup later

| Item | IDs | Rationale |
|------|-----|-----------|
| Split / slim `content.js` god module | AUD-004 | Maintainability at scale. |
| Social URL single source | AUD-006 | SEO vs UI drift. |
| Theme boot documentation or codegen | AUD-008 | Two-file contract. |
| Site copy / fonts single source | AUD-009,010 | Sprawl. |
| `Header` `ThemeToggle` extraction | AUD-012 | Duplication only. |
| `MarkdownBody` vs plugins split | AUD-013 | Optional clarity. |
| Curated config vs `content.js` | AUD-014 | Layering nicety. |
| Resume JSON guards or schema | AUD-015, COR-007 | Low likelihood until JSON edited badly. |
| Search `useMemo([])` semantics | COR-009 | Mostly dev / future-facing. |
| React keys for duplicate tags/skills | COR-008 | Edge case. |
| README / CONTENT_GUIDE drift | §6 #1 | Documentation. |
| `nodePolyfills` upgrade risk | §6 #7 | Watch on dependency bumps. |
| SEC-006 documentation, SEC-007 third-party posture | — | Process / privacy. |

---

### 12.4 Executive summary

This repo is a **small, static personal site** with **no app-level auth**; risk is dominated by **content you control** and **dependencies**. The highest-priority fixes are **correctness and injection on the article page**: (1) **sequence or cancel async loads** so navigation cannot show the wrong post, (2) **harden JSON-LD embedding** so front matter cannot break out of `<script type="application/ld+json">`, and (3) **validate dates** before `toISOString()` and consistently in the UI. After that, **consolidating `content.js`** removes duplicate glob/parse logic and aligns list vs search behavior — the largest maintainability win. **CSP**, **iframe sandbox**, and **Markdown link** hardening are the main **defense-in-depth** items. Remaining AUD items are mostly **DRY, docs, and structure** suitable for incremental cleanup.

---

### 12.5 Top 10 issues (merged priority)

1. **SEC-001** — HTML-safe serialization for JSON-LD (`Seo.jsx`).
2. **COR-001** — Fix stale async updates in `ContentDetailPage.jsx`.
3. **COR-002** — Validate dates before `toISOString()` in article JSON-LD.
4. **AUD-001 + COR-003** — Single content builder; consistent warnings for invalid MD.
5. **COR-004 + COR-005 + SEC-004** — Anchor `external` rules, `//` handling, prop spread order (`MarkdownBody.jsx`).
6. **SEC-005** — Add CSP (report-only first if needed).
7. **COR-010** (+ shared helper) — Safe date display on home and list pages.
8. **SEC-003** — `sandbox` on markdown iframes (tuned for real embeds).
9. **COR-006** — Unify TOC fragment IDs with rendered headings.
10. **AUD-006** — Single source for social URLs (`PROFILE_SAME_AS` vs `SocialLinks`).

---

### 12.6 Recommended sequencing

```text
Phase A — Ship-stoppers (user-visible + injection)
  → SEC-001 (safe JSON-LD)
  → COR-001 (async race)
  → COR-002 + COR-010 (date validate + format helper)

Phase B — Markdown hardening
  → COR-004 + COR-005 + SEC-004 (single PR)
  → SEC-003 (iframe sandbox)
  → SEC-005 (CSP report-only → enforce)

Phase C — Content layer refactor
  → AUD-001 + COR-003 (unified parse + search projection)
  → AUD-002 + AUD-003 (optional: fewer re-parses / shared raw loader)

Phase D — Polish & drift
  → COR-006 (TOC slugs)
  → AUD-006 (social DRY)
  → §6 docs (README / CONTENT_GUIDE)
  → Remaining AUD low-severity / COR-007–009 / SEC-006–008 as needed
```

---

### 12.7 Suggested engineering work items

| Work item | Outcome | Rough scope |
|-----------|---------|-------------|
| **E1** — `serializeJsonForHtml(data)` | Mitigates SEC-001 | Small util + `Seo` change + fixture with `</script>` in title. |
| **E2** — `useContentDetailLoad(contentType, slug)` with load token or `useEffect` cleanup guard | Fixes COR-001 | Hook or inline ref counter in `ContentDetailPage`. |
| **E3** — `parsePostDate(value)` + use in JSON-LD and list UIs | Fixes COR-002, COR-010 | `utils/date.js` or `text.js`. |
| **E4** — `buildAllContentRecords()` internal; `fetchAllContent` + `getSearchDocuments` call it | Fixes AUD-001, COR-003 | Refactor `content.js`. |
| **E5** — `MarkdownBody` anchor refactor | Fixes COR-004, COR-005, SEC-004 | Reorder spreads; extend `external` test matrix. |
| **E6** — CSP via `vercel.json` headers or meta | Mitigates SEC-005 | Config + iterate with report-only. |
| **E7** — iframe `sandbox` + allowlist review | Mitigates SEC-003 | `MarkdownBody` + manual embed smoke test. |
| **E8** — Single slug pipeline for TOC | Fixes COR-006 | Research rehype-slug vs github-slugger; align or post-render TOC. |
| **E9** — `socialProfiles` in `constants` | Fixes AUD-006 | Data + `SocialLinks` + `PROFILE_SAME_AS` derivation. |
| **E10** — README / CONTENT_GUIDE alignment | Fixes §6 #1 | Doc-only PR. |

---

### 12.8 Low-confidence findings — verify manually

| ID | Why manual verification |
|----|-------------------------|
| **COR-005** | Confirm whether `react-markdown` ever passes `href` inside `props` in this version — affects real-world exploitability. |
| **COR-006** | Reproduce with **non-ASCII or duplicate headings** in a real `.md` file; slugs may match in practice for your content. |
| **COR-008** | Confirm you never ship **duplicate tags or skills** in content. |
| **COR-009** | Confirm dev workflow: does HMR ever make search feel “stuck” without full reload? |
| **SEC-002** | Run a **targeted XSS fixture suite** (or OWASP cheat sheet strings) through the markdown pipeline; bypass risk is **library-dependent**. |
| **SEC-004** | End-to-end **opener / tab behavior** for `//` links after E5. |
| **SEC-008** | Inspect **transitive `js-yaml` / gray-matter** version and default schema for unsafe YAML tags in your lockfile. |
| **AUD-009** | Compare **view-source / crawler** vs client-rendered meta for key URLs if SEO is critical. |
| **AUD-013** | Decide if split is worth cost for this repo size. |
| **AUD-014–015** | Validate whether curated/resume JSON will be edited by others soon. |

---

## 1. Architecture summary

The project is a **client-side React SPA** (React 19, Vite 6) deployed as a static site. **Content is authored as Markdown** under `src/content/` with YAML front matter; at build time Vite’s `import.meta.glob` bundles those files. **Routing** is handled by React Router (browser history). **Vercel** serves the built assets with a **catch-all rewrite** to `index.html` for SPA navigation.

Major concerns in one line: **all content discovery and search indexing run in the browser**, parsing Markdown twice in separate code paths (`fetchAllContent` vs `getSearchDocuments`), with **no server-side API** — appropriate for a personal site, but worth watching for bundle size and duplicate work as content grows.

---

## 2. Major subsystems and responsibilities

| Subsystem | Location | Responsibility |
|-----------|----------|----------------|
| **App shell & routing** | `src/App.jsx`, `src/main.jsx` | Providers (`HelmetProvider`, `ThemeProvider`, `BrowserRouter`), lazy-loaded routes, global chrome (`Header`, `Footer`, `ScrollToTop`, skip link), Vercel Analytics |
| **Content index & queries** | `src/utils/content.js`, `src/config/home-curated.json` | Glob Markdown, parse front matter (`gray-matter`), normalize tags, sort by date, derive reading time, curated home ordering, hero image resolution, **search document building** |
| **Markdown rendering** | `src/components/MarkdownBody.jsx`, `src/utils/rehypeSanitizeSchema.js` | `react-markdown` + remark/rehype (GFM, highlight, raw HTML, slugs, **sanitize**) and custom `a` / `img` / `iframe` components |
| **Page types** | `src/pages/*.jsx` | Home (curated + lists), article/project indexes and filters, detail view with optional TOC, client search, résumé, 404 |
| **SEO & sharing** | `src/components/Seo.jsx`, `src/constants.js` | Title/description/canonical/OG/Twitter tags, JSON-LD hooks; `getCanonicalOrigin()` bridges `VITE_SITE_URL`, localhost, and `window` |
| **Theming** | `src/context/ThemeContext.jsx`, `src/context/useTheme.js`, `index.html` (inline script) | `localStorage` + `document.documentElement` class `dark`; theme-color meta; FOUC mitigation in HTML |
| **Static structured data** | `src/data/resume.json` | Résumé page content (and optional `pdfUrl`) |
| **Presentation tokens & global CSS** | `src/index.css`, `tailwind.config.js` | Design variables, Tailwind theme extensions (`@tailwindcss/typography`) |
| **Build & deploy** | `vite.config.js` (`@vitejs/plugin-react`, `vite-plugin-node-polyfills`), `vercel.json` | SPA build; Node polyfills for dependencies that expect Node APIs in the bundle |

---

## 3. Entry points, shared utilities, domain, infrastructure

### Entry points

- **`index.html`** — root mount, fonts, theme bootstrap script, `theme-color` meta.
- **`src/main.jsx`** — `ReactDOM.createRoot`, imports `App` and `index.css`.
- **`src/App.jsx`** — route table and global layout; **lazy imports** for every page chunk.

### Shared utilities (cross-cutting)

- **`src/utils/content.js`** — primary **content domain API**: glob, parse, filter, curated helpers, hero image async import, search haystacks. Imported by most pages that list or search content.
- **`src/utils/text.js`** — Markdown stripping (reading time + search), TOC extraction (`github-slugger`).
- **`src/constants.js`** — site copy, social `sameAs`, Substack URL, `getCanonicalOrigin()`, default OG asset path.

### Core domain modules

- **Content model** — enforced in `content.js`: `ALLOWED_TYPES = ['articles', 'projects']`; required front matter fields `title`, `date`, `excerpt`; optional `tags`, `cover` / `image`.
- **Curated home** — `src/config/home-curated.json` (`curatedSlugs`) drives featured hero and “picked” list on `HomePage`.

### Infrastructure / platform

- **`vercel.json`** — SPA fallback rewrite.
- **`public/`** — static assets (`favicon.svg`, `og-default.svg`, etc.).
- **`.env.example`** (if present) — documents `VITE_SITE_URL` for canonical/OG behavior.

---

## 4. Module map (dependency-oriented)

```
index.html
  └── src/main.jsx
        └── src/App.jsx
              ├── context/ThemeContext.jsx ← useTheme.js (Header)
              ├── components/Header, Footer, ScrollToTop, PageLoader
              └── pages/* (lazy)
                    ├── HomePage → content.js, constants, SocialLinks, useReveal, Seo
                    ├── ContentListPage → content.js, Seo
                    ├── ContentDetailPage → content.js, MarkdownBody, text.js, Seo, constants
                    ├── SearchPage → content.js, Seo
                    ├── ResumePage → resume.json, Seo
                    └── NotFoundPage

src/utils/content.js
  ├── gray-matter, import.meta.glob('../content/**/*.md')
  ├── config/home-curated.json
  └── text.js (reading time, search body)

src/components/MarkdownBody.jsx
  └── rehypeSanitizeSchema.js + react-markdown / rehype / remark stack
```

**Highly connected modules:** `content.js` (hub), `Seo.jsx` + `constants.js` (most routes), `MarkdownBody.jsx` + `rehypeSanitizeSchema.js` (any Markdown detail view).

---

## 5. Hotspots

### Large files (by line count, `src/`)

| Lines (approx.) | File | Note |
|-----------------|------|------|
| ~353 | `src/pages/HomePage.jsx` | Marketing layout, hero, multiple sections, JSON-LD |
| ~292 | `src/index.css` | Global design system surface |
| ~245 | `src/pages/ContentDetailPage.jsx` | Load path, error UI, TOC, SEO, Article JSON-LD |
| ~188 | `src/components/Header.jsx` | Nav + mobile menu + duplicated theme-toggle UI |
| ~158 | `src/utils/content.js` | **Duplicate** `import.meta.glob` logic vs `getSearchDocuments` |
| ~158 | `src/pages/ContentListPage.jsx` | Two inner page components (articles vs projects) |

None of these are huge monoliths by industry standards; the **semantic** hotspots matter more than raw size.

### Highly coupled modules

- **`src/utils/content.js`** — almost every list/search/home path depends on it; changes to glob paths, allowed types, or front matter rules ripple widely.
- **`ContentDetailPage`** — ties routing params, dynamic `import(\`../content/${contentType}/${slug}.md?raw\`)`, metadata merge, SEO, and markdown rendering.

### Cross-cutting utilities

- **`getCanonicalOrigin()`** — affects `Seo`, JSON-LD on Home and articles, OG URLs; environment and runtime branching.
- **`MarkdownBody` + sanitize schema** — single place where **untrusted content** (author-controlled Markdown with raw HTML/embeds) becomes DOM.

### Critical paths

1. **Route match** → lazy page → **`getContentItem` / dynamic import** → **`MarkdownBody`** render.
2. **Build-time glob** → front matter validation → sorted lists for home and indexes.
3. **Search** → `getSearchDocuments()` builds in-memory index on page load (memoized per `SearchPage` mount, but still parses all MD again).

### Security-sensitive areas

| Area | Risk / note |
|------|-------------|
| **`rehype-raw` + `rehype-sanitize`** | Raw HTML in Markdown is only as safe as **`markdownSanitizeSchema`**; extended tags include **`iframe`**, **`input`**, tables, etc. — review allowlists when adding markdown features. |
| **`iframe` `src` protocols** | Schema restricts `src` to `http` / `https` in `rehypeSanitizeSchema.js`. |
| **External links** | `MarkdownBody` sets `target="_blank"` and `rel="noopener noreferrer"` for `http(s)` links. |
| **No auth / no user input persistence** | Attack surface is largely **content injection via repo** (trusted author), not public uploads. |

---

## 6. Likely legacy or fragile areas

1. **Documentation drift** — `README.md` and `CONTENT_GUIDE.md` still describe **Coaching**, **notes**, and **videos** content types and paths; **git status** shows those pages/content removed while **`content.js`** only allows `articles` and `projects`. Readers following old docs will be misled.
2. **Duplicate content scanning** — `fetchAllContent()` and `getSearchDocuments()` each run a full **`import.meta.glob`** + `matter()` pass; easy for the two to **diverge** if one is updated and the other is not.
3. **Repeated `fetchAllContent()` calls** — list pages and home call helpers that re-scan the glob each time (Vite inlines modules, but work is still repeated at runtime per call).
4. **Theme initialization** — `index.html` inline script and `ThemeContext` both touch `localStorage` and `dark` class; they are aligned for `light`/`dark` only, but **no `prefers-color-scheme`** path — “fragile” only in the sense of **product expectation**, not necessarily bugs.
5. **Dynamic imports** — `ContentDetailPage` and `getHeroImageUrlForSlug` use **template paths** for `.md` files; typos or missing files surface as catch-all error UI; routing does not pre-validate slug existence against the index before navigation (user may flash loading then error).
6. **Sample content** — `sample-article.md` / `sample-project.md` remain as placeholders; fine for scaffolding, easy to ship accidentally.
7. **`nodePolyfills` in Vite** — suggests some dependency expects Node globals; upgrades to Vite or those packages can **break builds** if polyfill behavior changes.

---

## 7. Recommended areas for deep audit

Prioritized for **correctness, security, and maintainability** (not visual polish):

1. **Markdown pipeline** — Full pass on `rehypeSanitizeSchema.js` vs actual markdown/authored HTML; confirm no attribute or tag bypass; document what authors are allowed to use.
2. **`src/utils/content.js`** — Unify glob + parse into one internal builder; consider single source for “document” shape used by lists, search, and metadata; add a test or script that asserts **search documents** stay in sync with **indexed content**.
3. **`getCanonicalOrigin` + `Seo`** — Verify behavior for preview deployments, staging domains, and missing `VITE_SITE_URL`; SSR/hydration is not used, but **Helmet** output should be consistent for crawlers.
4. **`ContentDetailPage` load/error contract** — Align “missing slug” with router **404** if desired; reduce duplicate parsing (`getContentItem` + dynamic import both read the same file conceptually).
5. **Bundle / performance** — As `src/content` grows: impact of eager glob, `lowlight` languages, and duplicate parsing on **Search** and **home**.
6. **Docs cleanup** — Update or remove `README.md` / `CONTENT_GUIDE.md` sections that reference removed content types and pages so operational knowledge matches the code.

---

## 8. Quick reference — routes (`App.jsx`)

| Path | Page | Content source |
|------|------|------------------|
| `/` | `HomePage` | `content.js` + `home-curated.json` |
| `/articles`, `/articles?tag=` | `ContentListPage` | `articles/*.md` |
| `/articles/:slug` | `ContentDetailPage` | `articles/*.md` |
| `/projects` | `ContentListPage` | `projects/*.md` |
| `/projects/:slug` | `ContentDetailPage` | `projects/*.md` |
| `/resume` | `ResumePage` | `data/resume.json` |
| `/search` | `SearchPage` | in-memory index from all allowed MD |
| `*` | `NotFoundPage` | — |

---

## 9. Architecture audit findings

Focus: **layering**, **coupling**, **duplication**, **abstractions**, **ownership**, **hidden dependencies**, **configuration sprawl**, **central / oversized modules**.  
Severity: **High** (correctness or maintainability risk at scale) / **Medium** / **Low**.  
Confidence: how sure the finding is given static review of this repo (**High** / **Medium** / **Low**).

---

### AUD-001 — Duplicate Markdown index pipelines

| | |
|--|--|
| **Issue** | `fetchAllContent()` and `getSearchDocuments()` each call `import.meta.glob('../content/**/*.md')`, parse with `matter()`, filter by `ALLOWED_TYPES`, and apply the same required-field gate (`title`, `date`, `excerpt`). |
| **Affected modules** | `src/utils/content.js` |
| **Architectural consequence** | **Duplicated business logic**; validators can drift (e.g. search silently drops bad files while list logs warnings). **Double work** at runtime when both paths run. |
| **Refactor direction** | Single internal `buildContentRecords(modules)` (or one eager glob + map) producing both **list records** and **search projections**; optionally **memoize** the result at module scope for the SPA session. |
| **Severity** | Medium |
| **Confidence** | High |

---

### AUD-002 — Page layer re-parses files already modeled in `content.js`

| | |
|--|--|
| **Issue** | `ContentDetailPage` imports `gray-matter` and dynamically imports `../content/${contentType}/${slug}.md?raw` even after `getContentItem()` already proved the item exists via the glob index. Body text is parsed twice in spirit (index for reading time; page for body). |
| **Affected modules** | `src/pages/ContentDetailPage.jsx`, `src/utils/content.js` |
| **Architectural consequence** | **Unclear ownership** of “source of truth” for a post: metadata merge rules live in the page (`contentItem` vs front matter). **Layering leak**: UI route owns parsing and path templates. |
| **Refactor direction** | Expose `loadRawMarkdown(contentType, slug)` or include **body** in the indexed record if bundle size acceptable; or a single `getPostForDetail(contentType, slug)` that returns `{ body, meta }` so the page only renders. |
| **Severity** | Medium |
| **Confidence** | High |

---

### AUD-003 — Third parsing path for hero imagery

| | |
|--|--|
| **Issue** | `getHeroImageUrlForSlug` calls `getContentItem` then may `import(\`../content/articles/${slug}.md?raw\`)` and run `matter()` again to resolve cover / first image. |
| **Affected modules** | `src/utils/content.js`, `src/pages/HomePage.jsx` |
| **Architectural consequence** | **Triplicate** read/parse pattern for the same file; convention `../content/articles/${slug}` is **string-duplicated** with the dynamic import in `ContentDetailPage`. |
| **Refactor direction** | Fold hero image resolution into the same content builder as AUD-001/002, or one shared `importArticleRaw(slug)` helper used by detail + hero. |
| **Severity** | Low (until many articles or slow networks) |
| **Confidence** | High |

---

### AUD-004 — `content.js` as a god module

| | |
|--|--|
| **Issue** | One file owns glob wiring, validation, sorting, tag normalization, curated wiring, hero image extraction regex, async imports, and search indexing. |
| **Affected modules** | `src/utils/content.js`; transitive dependents: `HomePage`, `ContentListPage`, `ContentDetailPage`, `SearchPage` |
| **Architectural consequence** | **Excessive centrality**; any content feature touches a shared hub and risks **ripple regressions**. Hard to test pieces in isolation. |
| **Refactor direction** | Split into `content/glob.js`, `content/parseRecord.js`, `content/searchIndex.js`, `content/curated.js` (or similar) with a thin facade re-export if desired. |
| **Severity** | Medium |
| **Confidence** | High |

---

### AUD-005 — Hidden contract on filesystem path shape

| | |
|--|--|
| **Issue** | `contentType` is derived as `path.split('/')[2]` from keys produced by `import.meta.glob('../content/**/*.md')`. |
| **Affected modules** | `src/utils/content.js` |
| **Architectural consequence** | **Fragile coupling** to `src/content/<type>/file.md` depth; moving the content root or using aliases breaks typing silently. **No single named constant** for “segment index of type”. |
| **Refactor direction** | Parse with a regex or `path.relative` + split with explicit `CONTENT_ROOT`; or glob per type (`./articles/*.md`, `./projects/*.md`) to avoid positional splits. |
| **Severity** | Medium |
| **Confidence** | High |

---

### AUD-006 — Social profile URLs duplicated

| | |
|--|--|
| **Issue** | `PROFILE_SAME_AS` in `constants.js` duplicates URLs hardcoded in `SocialLinks.jsx` (with a comment to “keep in sync”). |
| **Affected modules** | `src/constants.js`, `src/components/SocialLinks.jsx`, `src/pages/HomePage.jsx` (JSON-LD uses `PROFILE_SAME_AS`) |
| **Architectural consequence** | **Unclear ownership** of profile data; drift causes **SEO JSON-LD** to disagree with **visible footer/home links**. |
| **Refactor direction** | One `socialProfiles` array in `constants` or `data/social.json` (name, url, icon key); derive `PROFILE_SAME_AS` as `map(url)` and feed `SocialLinks`. |
| **Severity** | Medium |
| **Confidence** | High |

---

### AUD-007 — Canonical origin logic forked for SSR-less Helmet

| | |
|--|--|
| **Issue** | `Seo.jsx` uses `getCanonicalOrigin()` when `window` is defined, but falls back to a **hardcoded** `'https://raghavkalyan.com'` when not — parallel to `getCanonicalOrigin()`’s own fallback. |
| **Affected modules** | `src/components/Seo.jsx`, `src/constants.js` |
| **Architectural consequence** | **Hidden dependency** on two strings staying aligned; preview/staging behavior may differ between code paths in subtle ways. |
| **Refactor direction** | `Seo` always uses `getCanonicalOrigin()` (extend it for “no window” build/prerender if added later); remove duplicate literal. |
| **Severity** | Low |
| **Confidence** | High |

---

### AUD-008 — Theme state split across HTML shell and React

| | |
|--|--|
| **Issue** | `index.html` inline script and `ThemeContext.jsx` both read/write `localStorage` key `theme` and toggle `document.documentElement.classList`. |
| **Affected modules** | `index.html`, `src/context/ThemeContext.jsx` |
| **Architectural consequence** | **Dual ownership** of the same side effect; changing key or default requires **two edits**. Acceptable for FOUC prevention but **implicit contract**. |
| **Refactor direction** | Document the contract in one place (short `theme-boot.md` or comment block in both files with shared constant name inlined as comment); or generate the inline script from a tiny shared JS snippet at build time. |
| **Severity** | Low |
| **Confidence** | High |

---

### AUD-009 — Site copy and branding scattered

| | |
|--|--|
| **Issue** | Default description appears in `index.html` meta, `constants.js` (`SITE_DESCRIPTION`), and indirectly via `Seo` defaults; title patterns split between `Seo` and `index.html` `<title>`. |
| **Affected modules** | `index.html`, `src/constants.js`, `src/components/Seo.jsx` |
| **Architectural consequence** | **Configuration sprawl** for marketing copy; crawlers may see **stale** static HTML vs client-updated tags depending on how the page is fetched. |
| **Refactor direction** | Treat `constants.js` as source of truth and inject into `index.html` via Vite plugin or accept duplication with a **build-time** check; for SPA, ensure `Seo` runs on every route (already mostly true). |
| **Severity** | Low |
| **Confidence** | Medium |

---

### AUD-010 — Typography configuration duplicated

| | |
|--|--|
| **Issue** | Google Fonts link for Plus Jakarta Sans / Source Sans 3 lives in `index.html`; `tailwind.config.js` repeats the same font family names for `fontFamily`. |
| **Affected modules** | `index.html`, `tailwind.config.js` |
| **Architectural consequence** | Changing fonts requires **two coordinated edits**; easy to get **FOIT/FOUT** vs utility classes out of sync. |
| **Refactor direction** | Single `theme/fonts` definition or Tailwind-only pipeline with `@import` in CSS (one file). |
| **Severity** | Low |
| **Confidence** | High |

---

### AUD-011 — Repeated date-formatting helpers

| | |
|--|--|
| **Issue** | `HomePage` defines `formatListDate`; `ContentListPage` defines `formatLong` twice (articles vs projects) with the same `toLocaleDateString('en-US', …)` options. |
| **Affected modules** | `src/pages/HomePage.jsx`, `src/pages/ContentListPage.jsx` |
| **Architectural consequence** | **Duplicated presentation/business rule** for how dates appear; locale or format changes need multiple edits. |
| **Refactor direction** | `formatPostDate(date)` in `utils/text.js` or `utils/date.js`. |
| **Severity** | Low |
| **Confidence** | High |

---

### AUD-012 — `Header` duplicates theme-toggle UI

| | |
|--|--|
| **Issue** | Desktop and mobile nav each embed nearly identical theme toggle markup (~40 lines × 2). |
| **Affected modules** | `src/components/Header.jsx` |
| **Architectural consequence** | Not architectural in the large sense, but **maintenance coupling**: accessibility or behavior changes must be duplicated. Contributes to **module size**. |
| **Refactor direction** | Extract `<ThemeToggleButton />` internal component. |
| **Severity** | Low |
| **Confidence** | High |

---

### AUD-013 — `MarkdownBody` bundles policy, security, and chrome

| | |
|--|--|
| **Issue** | One component selects the full remark/rehype stack, sanitize schema, **and** Tailwind classes for `img` / `iframe` wrappers. |
| **Affected modules** | `src/components/MarkdownBody.jsx`, `src/utils/rehypeSanitizeSchema.js` |
| **Architectural consequence** | Reasonable for a small app, but **mixed concerns** make it harder to reuse markdown rendering elsewhere (e.g. previews) without dragging styles. |
| **Refactor direction** | Split `markdownPlugins.js` (plugin array + schema import) from thin presentational wrapper; or accept as intentional for this codebase size. |
| **Severity** | Low |
| **Confidence** | Medium |

---

### AUD-014 — Curated config imported inside generic content util

| | |
|--|--|
| **Issue** | `home-curated.json` is imported by `content.js`, so **editorial/home layout** configuration is coupled to the **technical** glob/parse module. |
| **Affected modules** | `src/utils/content.js`, `src/config/home-curated.json` |
| **Architectural consequence** | **Layering blur**: “content platform” vs “home page product” are not separated; tests or reuse of content utils pull curated config. |
| **Refactor direction** | Move curated helpers to `src/config/curated.js` or `src/content/curated.js` that import JSON and call `getContentItem` from a slimmer `content.js`. |
| **Severity** | Low |
| **Confidence** | Medium |

---

### AUD-015 — Resume data shape owned only by JSON + page

| | |
|--|--|
| **Issue** | `resume.json` schema is implied by `ResumePage.jsx` access patterns; no shared types or validation. |
| **Affected modules** | `src/data/resume.json`, `src/pages/ResumePage.jsx` |
| **Architectural consequence** | **Fragile** if JSON is edited by hand; errors surface as **runtime** missing fields. Acceptable for personal site, poor if collaborators edit content. |
| **Refactor direction** | Zod/io-ts schema at build time, or document required keys in `CONTENT_GUIDE`-style doc for resume. |
| **Severity** | Low |
| **Confidence** | Medium |

---

### Summary — by theme

| Theme | Findings |
|-------|----------|
| Duplication | AUD-001, AUD-002, AUD-003, AUD-006, AUD-007, AUD-009, AUD-010, AUD-011, AUD-012 |
| Coupling / centrality | AUD-004, AUD-005, AUD-014 |
| Layering / ownership | AUD-002, AUD-006, AUD-008, AUD-013, AUD-014 |
| Configuration sprawl | AUD-006, AUD-007, AUD-009, AUD-010 |
| Hidden dependencies | AUD-005, AUD-007, AUD-008 |

---

## 10. Correctness audit findings

Each item is tied to **observable code** in this repo (line references current at audit time). **Confidence** reflects how likely the failure is in real use, not how severe the bug would be.

---

### COR-001 — Async content load can apply results out of order (`ContentDetailPage`)

| | |
|--|--|
| **File / module** | `src/pages/ContentDetailPage.jsx` |
| **Issue** | The `useEffect` that calls `fetchContent` runs an `async` function with `await import(...)` and `setState` in `try`/`finally`, but there is **no cancellation or request id**. |
| **Evidence** | ```25:51:src/pages/ContentDetailPage.jsx``` — `fetchContent` is async; no `AbortController`, no `let ignore` / sequence check before `setPageContent` / `setMetadata`. |
| **Failure scenario** | User opens `/articles/a`, then quickly navigates to `/articles/b`. The chunk for `a` resolves **after** `b`; state updates from `a` overwrite `b`, so the wrong article body and metadata render until the next navigation. |
| **Why it matters** | Classic **stale async** bug: silent data corruption in the primary reading surface. |
| **Suggested fix** | Use an `AbortController` (if the bundler supports aborting dynamic import, or at least gate updates), or increment a `loadId` ref and compare before each `setState`, or use React 19+ patterns that align with your router version. |
| **Confidence** | **High** (pattern is present; impact depends on slow network / large chunks). |

---

### COR-002 — Invalid `date` in front matter can crash article JSON-LD (`ContentDetailPage`)

| | |
|--|--|
| **File / module** | `src/pages/ContentDetailPage.jsx` |
| **Issue** | `articleJsonLd` `useMemo` calls `new Date(metadata.date).toISOString()` whenever `metadata.date` is truthy, without validating the `Date`. |
| **Evidence** | ```58:69:src/pages/ContentDetailPage.jsx``` — `const datePublished = metadata.date ? new Date(metadata.date).toISOString() : undefined;` |
| **Failure scenario** | Front matter includes a non-ISO or typo value that is still truthy (e.g. `"TBD"`, `"2025-13-40"`). `new Date(...)` is invalid; **`.toISOString()` throws `RangeError`**, which can break the whole page render for that route. |
| **Why it matters** | Author mistake in YAML becomes a **hard runtime failure** for readers. |
| **Suggested fix** | `const d = metadata.date ? new Date(metadata.date) : null; const datePublished = d && !Number.isNaN(d.getTime()) ? d.toISOString() : undefined;` |
| **Confidence** | **High** (ECMAScript `Date.prototype.toISOString` throws on invalid time value). |

---

### COR-003 — Search index drops bad rows silently; list index warns (`content.js`)

| | |
|--|--|
| **File / module** | `src/utils/content.js` |
| **Issue** | The same validation (`!data.title \|\| !data.date \|\| !data.excerpt`) is implemented twice; **branches differ in observability**. |
| **Evidence** | ```33:35:src/utils/content.js``` — `console.warn` for missing fields in `fetchAllContent`. ```131:131:src/utils/content.js``` — `if (!data.title \|\| !data.date \|\| !data.excerpt) return null;` in `getSearchDocuments` with **no** `console.warn`. ```150:152:src/utils/content.js``` — inner `catch { return null; }` swallows parse errors silently. |
| **Failure scenario** | A draft MD file is partially filled: it appears in **neither** search nor lists, with **no warning** from the search path; or parse errors vanish silently while debugging search. |
| **Why it matters** | **Stale mental model** for authors (“why isn’t this findable?”) and **harder diagnosis** when list and search diverge after a partial edit. |
| **Suggested fix** | Share one `parseContentFile(path, raw)` that logs consistently; or mirror the same `console.warn` / error policy in both paths. |
| **Confidence** | **High** (code paths are side by side in the same file). |

---

### COR-004 — Protocol-relative links skip “external” hardening (`MarkdownBody`)

| | |
|--|--|
| **File / module** | `src/components/MarkdownBody.jsx` |
| **Issue** | `external` is true only when `href?.startsWith('http')`. URLs starting with `//` are **not** treated as external. |
| **Evidence** | ```17:24:src/components/MarkdownBody.jsx``` — `const external = href?.startsWith('http');` then conditional `target` / `rel`. |
| **Failure scenario** | Markdown contains `[link](//example.com/path)`. The browser resolves it to another host but the app does **not** add `rel="noopener noreferrer"` or `target="_blank"` (depending on desired policy), changing **tab / opener** behavior vs true `https://` links. |
| **Why it matters** | Inconsistent **security / UX contract** for “off-site” links; `//` is a common authoring form. |
| **Suggested fix** | Treat as external if `href?.startsWith('http') || href?.startsWith('//')` (and optionally `mailto:`, `tel:` explicitly). |
| **Confidence** | **High** for the classification bug; **Medium** for real-world exploit impact on this static personal site. |

---

### COR-005 — Anchor `href` can be overridden by spread order (`MarkdownBody`)

| | |
|--|--|
| **File / module** | `src/components/MarkdownBody.jsx` |
| **Issue** | The custom `a` renderer sets `href={href}` then spreads `{...props}` **after**, so any `href` inside `props` from the tree builder **overwrites** the explicit `href`. |
| **Evidence** | ```20:26:src/components/MarkdownBody.jsx``` — order is `href={href}`, `{...props}`, then external attrs. |
| **Failure scenario** | If `react-markdown` / rehype passes `href` both as a destructured arg and inside `props` (or future plugin adds `href` to props), the rendered URL may not match `href` used for the `external` check, producing **wrong `rel` / `target`** or wrong destination. |
| **Why it matters** | Subtle **contract mismatch** between security logic and DOM output. |
| **Suggested fix** | Spread props first, then force `href={href}`, then apply `target`/`rel`; or destructure `href` out of `props` before spread. |
| **Confidence** | **Medium** (depends on react-markdown prop shape; defensive ordering is still warranted). |

---

### COR-006 — TOC anchor IDs may not match `rehype-slug` IDs (`text.js` vs `MarkdownBody`)

| | |
|--|--|
| **File / module** | `src/utils/text.js` (`extractMarkdownToc` uses `github-slugger`), `src/components/MarkdownBody.jsx` (`rehype-slug` in rehype pipeline) |
| **Issue** | Table-of-contents links use IDs from **`github-slugger`** on raw `##` / `###` lines, while rendered headings get IDs from **`rehype-slug`** on the processed HTML tree. The algorithms are not guaranteed identical for all titles (unicode, punctuation, duplicates). |
| **Evidence** | ```27:44:src/utils/text.js``` (`slugger.slug(title)`). ```9:9:src/components/MarkdownBody.jsx``` (`rehypeSlug` in `rehypePlugins`). ```206:209:src/pages/ContentDetailPage.jsx``` (TOC links use `item.id` as the URL fragment). |
| **Failure scenario** | For some heading text, TOC “On this page” links scroll to **nowhere** or the wrong heading because `#id` does not exist on the page. |
| **Why it matters** | Broken **in-page navigation** on long articles exactly when TOC is shown (`readingMinutes >= 5` etc.). |
| **Suggested fix** | Use one slugging strategy for both (e.g. parse AST with the same slugger as rehype-slug, or build TOC from rendered heading IDs via a ref pass — heavier). |
| **Confidence** | **Medium** (divergence shows up on edge-case titles, not typical ASCII headings). |

---

### COR-007 — `ResumePage` assumes arrays and nested `bullets` always exist

| | |
|--|--|
| **File / module** | `src/pages/ResumePage.jsx`, `src/data/resume.json` |
| **Issue** | Unconditional `.map` on `resume.experience`, `resume.education`, `resume.skills`, and `job.bullets` with no guards. |
| **Evidence** | ```31:42:src/pages/ResumePage.jsx``` — `resume.experience.map`; ```37:37:src/pages/ResumePage.jsx``` — `job.bullets.map`. ```49:62:src/pages/ResumePage.jsx``` — `resume.education.map`, `resume.skills.map`. |
| **Failure scenario** | JSON is edited to omit `experience`, set it to `null`, or remove `bullets` from one job → **`TypeError: ... is not iterable`** and a blank page. |
| **Why it matters** | **Silent production break** from a simple content edit; no build-time validation. |
| **Suggested fix** | `(resume.experience ?? []).map`, `(job.bullets ?? []).map`, etc., or validate JSON at build time (Zod / JSON schema). |
| **Confidence** | **High** for JS semantics; **Low** for likelihood while a single maintainer controls `resume.json`. |

---

### COR-008 — Duplicate tags / skills produce duplicate React keys

| | |
|--|--|
| **File / module** | `src/pages/ContentDetailPage.jsx`, `src/pages/ResumePage.jsx` |
| **Issue** | Lists use stable string keys derived from **values** that are not guaranteed unique in data. |
| **Evidence** | ```179:180:src/pages/ContentDetailPage.jsx``` — `metadata.tags.map((tag) => (<li key={tag}>`. ```62:62:src/pages/ResumePage.jsx``` — `resume.skills.map((s) => (<li key={s}>`. |
| **Failure scenario** | Front matter repeats a tag; `skills` array repeats a skill → **duplicate React keys**, warnings, and possible **incorrect reconciliation** (hover/focus glitches). |
| **Why it matters** | Data is free-form; duplicates are plausible after merges or copy-paste. |
| **Suggested fix** | `key={\`${tag}-${i}\`}` or dedupe tags when normalizing. |
| **Confidence** | **High** for React key rules; **Medium** for how often duplicates appear in your content. |

---

### COR-009 — `SearchPage` search index frozen for SPA lifetime

| | |
|--|--|
| **File / module** | `src/pages/SearchPage.jsx` |
| **Issue** | `getSearchDocuments()` is called inside `useMemo` with an **empty dependency array**, so the returned array is fixed for the life of the mounted app shell. |
| **Evidence** | ```14:14:src/pages/SearchPage.jsx``` — `const docs = useMemo(() => getSearchDocuments(), []);` |
| **Failure scenario** | In **dev**, if HMR or tooling injects new modules without a full reload, or if future code ever mutates content at runtime, search results **never refresh** until a hard reload. In production static deploys this is usually fine. |
| **Why it matters** | **Stale invariant** between “files on disk” and in-memory index during development or future dynamic features. |
| **Suggested fix** | Document as intentional; or drop `useMemo` (cheap if doc count is small); or depend on a `contentVersion` if you add one. |
| **Confidence** | **High** for the dependency behavior; **Low** for user-visible impact today. |

---

### COR-010 — Invalid article dates render without throwing (`HomePage`, `ContentListPage`)

| | |
|--|--|
| **File / module** | `src/pages/HomePage.jsx`, `src/pages/ContentListPage.jsx` |
| **Issue** | Dates from front matter are passed to `new Date(d).toLocaleDateString(...)` with no validity check. |
| **Evidence** | ```50:55:src/pages/HomePage.jsx``` — `formatListDate`. ```14:18:src/pages/ContentListPage.jsx``` — `formatLong` (and duplicate in `ProjectsIndex`). |
| **Failure scenario** | Bad `date` string yields **Invalid Date**; `toLocaleDateString` typically returns `"Invalid Date"` **as visible UI text** (no crash), confusing readers and harming trust. |
| **Why it matters** | Same bad YAML as COR-002, but here it **degrades visibly** instead of failing loud — inconsistent error behavior across pages. |
| **Suggested fix** | Shared formatter with `Number.isNaN(d.getTime())` fallback (hide date or show raw string + warning in dev). |
| **Confidence** | **High** for Invalid Date string behavior in major browsers. |

---

### Summary — correctness

| ID | Risk theme |
|----|------------|
| COR-001 | Concurrency / stale async |
| COR-002 | Unvalidated date → throw |
| COR-003 | Silent failure / divergent diagnostics |
| COR-004, COR-005 | Link handling / security-related assumptions |
| COR-006 | Stale invariant between TOC and rendered IDs |
| COR-007 | Missing null guards on JSON-driven UI |
| COR-008 | React keys vs duplicate data |
| COR-009 | Memoization / stale in-memory index |
| COR-010 | Invalid dates in UI lists |

---

## 11. Security audit findings

**Scope:** Static React SPA; **no application authentication or authorization** — the effective control is **who can change the Git repository / build**. Findings below are **injection / trust-boundary / configuration** issues unless noted otherwise.

Each item: **affected surface**, **exploit path**, **severity**, **mitigation**, **confidence**.

---

### SEC-001 — Breakout from `application/ld+json` via `</script>` in string values

| | |
|--|--|
| **Affected surface** | `src/components/Seo.jsx` (`<script type="application/ld+json">` children), fed by `jsonLd` from `src/pages/HomePage.jsx`, `src/pages/ContentDetailPage.jsx` (Article schema built from front matter). |
| **Evidence** | ```45:48:src/components/Seo.jsx``` — `{JSON.stringify(data)}` embedded as raw text inside `<script>`. |
| **Exploit path** | A maintainer (or compromised contributor) sets front matter fields used in JSON-LD (e.g. `title`, `excerpt`, or nested strings) to include a substring like `</script><script>…` (after JSON quoting, the **serialized output** can still contain the literal character sequence `</script>`, which terminates the HTML script element in browser parsers). That enables **HTML/script injection** in the document when the page is rendered. |
| **Severity** | **Medium** for a sole-maintainer repo (self‑inflicted / SEO tampering); **High** if untrusted parties can merge content without review. |
| **Mitigation** | Serialize with an HTML-safe JSON encoder for inline scripts (e.g. replace `<` with `\u003c` in the serialized string), use a helper recommended by OWASP for JSON in HTML, or avoid inline scripts (server-injected nonce + external JSON). |
| **Confidence** | **High** (well-documented HTML/script parsing interaction with `</script>`). |

---

### SEC-002 — `rehype-raw` + widened sanitize allowlist (HTML in Markdown)

| | |
|--|--|
| **Affected surface** | `src/components/MarkdownBody.jsx` (`rehypeRaw` before sanitize), `src/utils/rehypeSanitizeSchema.js` (extra tags: `iframe`, `div`, `input`, tables, etc.). |
| **Evidence** | ```9:9:src/components/MarkdownBody.jsx``` — plugin order includes `rehypeRaw` and `[rehypeSanitize, markdownSanitizeSchema]`. ```7:21:src/utils/rehypeSanitizeSchema.js``` — extended `tagNames`. |
| **Exploit path** | Security depends entirely on **`rehype-sanitize` + this schema** staying correct. Any **missed attribute**, **tag**, or **bypass** in upstream libraries becomes **stored XSS** in article/project bodies for site visitors. Extra surface (`input`, `iframe`, rich `div`/`span` classes) increases **attack surface** vs a minimal allowlist. |
| **Severity** | **High** if sanitize is bypassed; **Low–Medium** while defaults hold and content authors are trusted. |
| **Mitigation** | Keep plugins updated; periodically diff your schema against `defaultSchema`; add **CSP** (SEC-005) as defense in depth; consider dropping `input` / narrowing `iframe` if unused; add CI tests with known XSS payloads in fixtures. |
| **Confidence** | **High** for “raw HTML path exists”; **Medium** for likelihood of a practical bypass today. |

---

### SEC-003 — Embedded `iframe` without `sandbox`

| | |
|--|--|
| **Affected surface** | `src/components/MarkdownBody.jsx` custom `iframe` renderer; sanitize allows `iframe` + `src` with `http`/`https` (```38:55:src/utils/rehypeSanitizeSchema.js```). |
| **Exploit path** | Author embeds a **benign-looking HTTPS** page that performs **top-level navigation**, **pop-ups**, **user tracking**, or **UI deception** inside the article chrome. Not classic XSS of the parent origin, but **user harm / phishing / tracking** within normal browsing. |
| **Severity** | **Low–Medium** (depends on attacker-controlled embeds and user trust). |
| **Mitigation** | Add `sandbox` with the smallest permission set (often `allow-scripts allow-same-origin` for video embeds only, or use allowlisted oEmbed domains and strip arbitrary `iframe`). |
| **Confidence** | **High** (iframes are rendered with no `sandbox` in code). |

---

### SEC-004 — Link “external” detection omits `//` and non-http(s) schemes

| | |
|--|--|
| **Affected surface** | `src/components/MarkdownBody.jsx` anchor renderer. |
| **Evidence** | ```17:23:src/components/MarkdownBody.jsx``` — `external = href?.startsWith('http')`. |
| **Exploit path** | `href="//evil.example/phish"` is treated as **non-external**: no `target="_blank"` / `rel="noopener noreferrer"` policy applied consistently with `https://` links — **mixed behavior** for phishing / `window.opener` (when combined with other bugs) and inconsistent UX. `javascript:` should be stripped by sanitize **href** protocols (```52:56:src/utils/rehypeSanitizeSchema.js```) but any gap reopens classic **script-in-URL** risk. |
| **Severity** | **Low–Medium** (defense-in-depth / consistency; primary scheme blocking is in sanitize). |
| **Mitigation** | Treat `//` as external; explicitly block or normalize dangerous schemes in the component; align with COR-004/COR-005 hardening. |
| **Confidence** | **High** for classification behavior; **Medium** for end-to-end exploit without a sanitize failure. |

---

### SEC-005 — No Content-Security-Policy (CSP)

| | |
|--|--|
| **Affected surface** | `index.html` and built static assets — no `Content-Security-Policy` (or `Content-Security-Policy-Report-Only`) meta/header in repo. |
| **Evidence** | ```1:37:index.html``` — no CSP meta; deploy config `vercel.json` only rewrites. |
| **Exploit path** | If **SEC-002** ever fails (sanitize bypass, dependency regression, future `dangerouslySetInnerHTML`), there is **no second-line** policy limiting `script-src`, `img-src`, `frame-src`, etc. |
| **Severity** | **Medium** as defense-in-depth gap; primary XSS controls are still sanitize + React escaping for React-rendered trees. |
| **Mitigation** | Add a strict CSP compatible with Vite build hashes/nonces, `@vercel/analytics`, and Google Fonts; iterate with report-only mode. |
| **Confidence** | **High** (CSP absent from checked files). |

---

### SEC-006 — `VITE_*` environment variables are client-public

| | |
|--|--|
| **Affected surface** | Vite client bundle; `src/constants.js` reads `import.meta.env.VITE_SITE_URL`. |
| **Evidence** | ```20:23:src/constants.js```; ```1:2:.env.example``` documents `VITE_SITE_URL`. |
| **Exploit path** | Any future **API keys, tokens, or private endpoints** mistakenly prefixed with `VITE_` are **compiled into JavaScript** and trivially extracted from the deployed site. |
| **Severity** | **High** if misused; **Low** for current repo (public origin URL only). |
| **Mitigation** | Document “never put secrets in `VITE_`”; use server-only env on a backend if secrets are ever needed; keep `.env.example` explicit about safe vars. |
| **Confidence** | **High** (Vite semantics). |

---

### SEC-007 — Third-party script and font loading

| | |
|--|--|
| **Affected surface** | `index.html` loads Google Fonts CSS; runtime includes `@vercel/analytics`. |
| **Evidence** | ```9:13:index.html``` — `fonts.googleapis.com` / `fonts.gstatic.com`; `src/App.jsx` imports `@vercel/analytics/react`. |
| **Exploit path** | **Supply-chain / availability**: compromise or outage at Google or Vercel affects page behavior or privacy (tracking). Not local privilege escalation. |
| **Severity** | **Low** (operational / privacy). |
| **Mitigation** | Self-host fonts; use SRI where applicable for static `<link>`; review Analytics necessity and privacy policy. |
| **Confidence** | **High**. |

---

### SEC-008 — Front matter parsed as YAML (`gray-matter`) is a trust boundary

| | |
|--|--|
| **Affected surface** | `src/utils/content.js`, `src/pages/ContentDetailPage.jsx` — `matter(raw)` on all `.md` files. |
| **Evidence** | `gray-matter` dependency in `package.json`; used at ```27:27:src/utils/content.js``` and ```35:35:src/pages/ContentDetailPage.jsx```. |
| **Exploit path** | Malicious or **pathological YAML** (anchors, deep nesting) could cause **parse CPU/memory** issues at build or first client parse, or unexpected types in `data` if consumed unsafely elsewhere. No `!!js/function`-style execution is expected from modern safe YAML defaults, but **parsers must stay patched**. |
| **Severity** | **Low** for typical small front matter; **Medium** if CI/build ingests untrusted files at scale. |
| **Mitigation** | Treat `.md` as **trusted**; pin/upgrades for `gray-matter`/`js-yaml`; optional size/depth limits in CI. |
| **Confidence** | **Medium** (depends on transitive YAML parser behavior and versions). |

---

### Summary — security

| ID | Category |
|----|----------|
| SEC-001 | Injection (JSON-in-HTML) |
| SEC-002 | XSS surface (raw HTML + sanitize) |
| SEC-003 | Embed abuse (iframe) |
| SEC-004 | Link policy / opener consistency |
| SEC-005 | Missing CSP |
| SEC-006 | Client-exposed build-time config |
| SEC-007 | Third-party trust |
| SEC-008 | Deserialization / YAML trust |

**Not applicable in this codebase:** application **authn/authz**, session handling, server-side **SQL/command injection**, **privilege escalation** within the app (no roles). Operational controls (GitHub org, branch protection, 2FA) dominate access control.

---

*Generated as a structural map of the repository; re-run or extend when adding new content types, SSR, or a backend. **§12 appears first**; §§1–11 follow (map and audits).*
