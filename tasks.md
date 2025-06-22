Expanded Website Enhancement Plan: Day-by-Day Steps
Improvement 1: Make Projects Clickable with Dedicated Pages
Step 1.1: Create Project Content Directory

Task: Set up a directory for project markdown files.
Action: Create src/content/projects/ in your Astro project. Add one sample markdown file (e.g., project1.md) with frontmatter (title, description, image, date, tags) and body content (e.g., project details, tech stack, outcome).
Definition of Done: src/content/projects/project1.md exists with valid frontmatter and content, viewable in your code editor.
Estimated Time: 30 minutes.

Step 1.2: Configure Astro Content Collection

Task: Define the projects collection in Astro.
Action: In src/content/config.ts, add a projects collection schema using defineCollection and z.object. Include fields like title: z.string(), description: z.string(), image: z.string().optional(), date: z.date(), tags: z.array(z.string()).
Definition of Done: config.ts includes a projects collection, and running astro dev shows no schema errors.
Estimated Time: 45 minutes.

Step 1.3: Create Dynamic Project Page Route

Task: Add a dynamic route for individual project pages.
Action: Create src/pages/projects/[slug].astro. Use getCollection to fetch projects and Astro.params.slug to render the matching project's content (title, description, image, body). Include a basic layout with DaisyUI classes.
Definition of Done: Navigating to /projects/project1 in the browser displays the project1.md content correctly.
Estimated Time: 1 hour.

Step 1.4: Update Project List to Link to Pages

Task: Modify the projects list to link to individual pages.
Action: In src/pages/projects/index.astro (or similar), update the HorizontalCard component to use <a href="/projects/{project.slug}"> for each project, pulling slug from the content collection.
Definition of Done: Clicking a project card on the projects page navigates to its dedicated page (e.g., /projects/project1).
Estimated Time: 45 minutes.

Step 1.5: Style Project Pages

Task: Ensure project pages are styled consistently.
Action: In [slug].astro, apply BaseLayout.astro and DaisyUI classes (e.g., card, prose) to match blog page styling. Test responsiveness on mobile and desktop.
Definition of Done: Project pages look visually consistent with blog pages, with no layout issues on any screen size.
Estimated Time: 1 hour.

Step 1.6: Add Multiple Projects

Task: Populate the projects collection with real content.
Action: Create at least two more markdown files in src/content/projects/ (e.g., project2.md, project3.md) with unique frontmatter and content.
Definition of Done: Projects page lists all projects, and each links to its respective page.
Estimated Time: 45 minutes.

Improvement 2: Set Dark Mode as Default
Step 2.1: Update Theme Logic in BaseLayout

Task: Set lofi (DaisyUI dark theme) as the default.
Action: In src/layouts/BaseLayout.astro, add a script to check localStorage.getItem('theme'); if null, set document.documentElement.setAttribute('data-theme', 'lofi').
Definition of Done: Reloading the site with no saved theme applies the lofi theme by default.
Estimated Time: 30 minutes.

Step 2.2: Fix Theme Toggle Consistency

Task: Ensure the theme toggle works reliably.
Action: In the theme toggle component (e.g., src/components/ThemeToggle.astro), update the JavaScript to toggle between lofi and light, saving the choice to localStorage. Test on page reloads.
Definition of Done: Toggling switches between themes, persists across reloads, and shows no flickering.
Estimated Time: 45 minutes.

Step 2.3: Test Theme Across Pages

Task: Verify dark mode consistency site-wide.
Action: Navigate through all pages (home, blog, projects) in astro dev. Check for light-themed elements (e.g., cards, buttons) and fix CSS if needed.
Definition of Done: All pages display the lofi theme by default with no visual inconsistencies.
Estimated Time: 30 minutes.

Step 2.4: Ensure Theme Toggle Accessibility

Task: Make the theme toggle accessible.
Action: Add aria-label="Toggle theme" to the toggle button and ensure it's focusable via keyboard (e.g., <button> element). Test with a screen reader.
Definition of Done: Theme toggle is keyboard-navigable and screen-reader-friendly.
Estimated Time: 30 minutes.

Improvement 3: Add a "Now" Page
Step 3.1: Create Now Page

Task: Add now.astro page.
Action: Create src/pages/now.astro using BaseLayout.astro. Add static content (e.g., "What I'm working on: [project], Reading: [book], Learning: [skill]") with DaisyUI styling.
Definition of Done: /now route renders a styled page with your "Now" content.
Estimated Time: 45 minutes.

Step 3.2: Add Sidebar Link

Task: Link to the "Now" page from the sidebar.
Action: In the sidebar component (e.g., src/components/Sidebar.astro), add <a href="/now" class="menu-item">Now</a>.
Definition of Done: Sidebar shows "Now" link, and clicking it navigates to the page.
Estimated Time: 30 minutes.

Step 3.3: Style Now Page

Task: Ensure the "Now" page matches site aesthetics.
Action: Apply consistent typography, spacing, and DaisyUI classes (e.g., prose, card). Add a header or hero section for visual appeal.
Definition of Done: "Now" page looks cohesive with other pages and is responsive.
Estimated Time: 45 minutes.

Step 3.4: Add Update Reminder

Task: Create a system to keep the "Now" page fresh.
Action: Add a comment in now.astro (e.g., <!-- Update monthly -->) and note in your personal task manager to refresh content periodically.
Definition of Done: Reminder is set, and "Now" page content is current.
Estimated Time: 15 minutes.

Improvement 4: Consistent Link Behavior
Step 4.1: Audit Internal Links

Task: Ensure internal links open in the same tab.
Action: In HorizontalCard and sidebar components, remove target attributes for internal links (e.g., /blog, /projects) or set target="_self".
Definition of Done: All internal links open in the same tab.
Estimated Time: 45 minutes.

Step 4.2: Audit External Links

Task: Ensure external links open in new tabs.
Action: Check external links (e.g., GitHub, socials) in sidebar, footer, and cards. Add target="_blank" and rel="noopener noreferrer".
Definition of Done: All external links open in new tabs with proper attributes.
Estimated Time: 30 minutes.

Step 4.3: Test Link Behavior

Task: Verify consistent link behavior site-wide.
Action: Click through all links in astro dev (sidebar, cards, footer) to confirm internal links stay in the same tab and external links open new tabs.
Definition of Done: All links behave as expected with no errors.
Estimated Time: 30 minutes.

Step 4.4: Add Visual Cues for External Links

Task: Differentiate external links visually.
Action: Add a small icon (e.g., DaisyUI external-link icon) or CSS (e.g., ::after with an arrow) to external links.
Definition of Done: External links have a visual indicator, visible in the browser.
Estimated Time: 45 minutes.

Improvement 5: Custom Cursor (Glowing Dot)
Step 5.1: Add Cursor CSS

Task: Style a glowing dot cursor.
Action: In src/styles/global.css, add:.cursor {
  position: fixed;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
  pointer-events: none;
  z-index: 9999;
}
* { cursor: none !important; }


Definition of Done: Cursor appears as a glowing dot in astro dev.
Estimated Time: 45 minutes.

Step 5.2: Add Cursor JavaScript

Task: Make the cursor follow the mouse.
Action: In BaseLayout.astro, add:<div class="cursor" id="cursor"></div>
<script>
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX - 6}px`;
    cursor.style.top = `${e.clientY - 6}px`;
  });
</script>


Definition of Done: Glowing dot follows the mouse smoothly.
Estimated Time: 1 hour.

Step 5.3: Ensure Cursor Accessibility

Task: Prevent cursor from interfering with usability.
Action: Add CSS to hide the custom cursor on touch devices (@media (hover: none) { .cursor { display: none; } }) and ensure the default cursor is visible on interactive elements.
Definition of Done: Custom cursor works on desktop but not mobile, and interactive elements are usable.
Estimated Time: 30 minutes.

Step 5.4: Add Hover Effects

Task: Enhance cursor on hover.
Action: Add CSS to scale the cursor on hoverable elements (e.g., a:hover ~ .cursor { transform: scale(1.5); }) and test on buttons/links.
Definition of Done: Cursor scales slightly when hovering over links/buttons.
Estimated Time: 45 minutes.

Improvement 6: Search Function for Blog and Projects
Step 6.1: Create Search Component

Task: Build a search input component.
Action: Create src/components/Search.astro with:<div class="search">
  <input type="text" placeholder="Search blog or projects..." class="input input-bordered w-full" />
  <div class="search-results"></div>
</div>

Style with DaisyUI classes.
Definition of Done: Search input renders on blog or projects page.
Estimated Time: 45 minutes.

Step 6.2: Install Fuse.js

Task: Add Fuse.js for search functionality.
Action: Run npm install fuse.js and verify it's in package.json.
Definition of Done: Fuse.js is installed with no errors on astro dev.
Estimated Time: 15 minutes.

Step 6.3: Implement Client-Side Search Logic

Task: Add search logic with Fuse.js.
Action: In Search.astro, add a client-side script:<script>
  import Fuse from 'fuse.js';
  const searchInput = document.querySelector('.search input');
  const resultsDiv = document.querySelector('.search-results');
  const items = [/* Fetch blog/projects via Astro.glob or API */];
  const fuse = new Fuse(items, { keys: ['title', 'description'] });
  searchInput.addEventListener('input', (e) => {
    const results = fuse.search(e.target.value);
    resultsDiv.innerHTML = results.map(r => `<div>${r.item.title}</div>`).join('');
  });
</script>


Definition of Done: Typing in the search bar filters and displays matching blog/project titles.
Estimated Time: 1 hour.

Step 6.4: Style Search Results

Task: Style the search results.
Action: Add CSS to .search-results (e.g., card, shadow, p-4) and ensure results are clickable links to blog/project pages.
Definition of Done: Search results are styled, responsive, and link to correct pages.
Estimated Time: 45 minutes.

Step 6.5: Test Search Functionality

Task: Verify search works across content.
Action: Test search with various queries (e.g., project titles, tags) and ensure results are accurate and fast.
Definition of Done: Search returns relevant results with no errors or delays.
Estimated Time: 30 minutes.

