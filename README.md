# Raghav Kalyan - Personal Portfolio

A modern, content-driven personal portfolio website built with React, Vite, and Tailwind CSS. This site showcases articles, projects, notes, and videos, all managed through markdown files.

## 🚀 Features

- **Content-Driven**: All content is managed through markdown files with YAML frontmatter
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern Stack**: Built with React 19, Vite, and Tailwind CSS
- **Dynamic Routing**: Client-side routing with React Router
- **Markdown Support**: Beautiful markdown rendering with syntax highlighting
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Fast Performance**: Optimized build with code splitting

## 🛠️ Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with @tailwindcss/typography
- **Routing**: React Router DOM
- **Content**: Markdown with gray-matter for frontmatter parsing
- **Markdown Rendering**: react-markdown with remark-gfm

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   └── SocialLinks.jsx # Social media links
├── pages/              # Page components
│   ├── HomePage.jsx    # Landing page
│   ├── ContentListPage.jsx # Content listing pages
│   ├── ContentDetailPage.jsx # Individual content pages
│   └── CoachingPage.jsx # Coaching services page
├── content/            # Markdown content files
│   ├── articles/       # Blog articles
│   ├── projects/       # Project showcases
│   ├── notes/          # Quick notes and thoughts
│   └── videos/         # Video content
└── utils/              # Utility functions
    └── content.js      # Content processing utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd raghavkalyan.com
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📝 Content Management

### Adding New Content

To add new content, simply create a new markdown file in the appropriate directory:

- **Articles**: `src/content/articles/your-article.md`
- **Projects**: `src/content/projects/your-project.md`
- **Notes**: `src/content/notes/your-note.md`
- **Videos**: `src/content/videos/your-video.md`

### Content Format

Each markdown file should include YAML frontmatter with the following fields:

```yaml
---
title: "Your Content Title"
date: "2024-01-15"
excerpt: "A brief description of your content"
---
```

### Content Guidelines

- Use descriptive filenames (e.g., `building-react-apps.md`)
- Include all required frontmatter fields
- Write clear, engaging excerpts
- Use proper markdown formatting
- Include images in the `public/` directory

## 🎨 Customization

### Styling

The site uses Tailwind CSS for styling. You can customize the design by:

1. Modifying `tailwind.config.js` for theme changes
2. Updating `src/index.css` for global styles
3. Adding custom components in `src/components/`

### Colors

The current color scheme is defined in `tailwind.config.js`:

- Primary Link: `#007BFF`
- Primary Button: `#28A745`
- Light Background: `#F5F5F5`

### Content Types

To add new content types:

1. Create a new directory in `src/content/`
2. Add routes in `src/App.jsx`
3. Update the navigation in `src/components/Header.jsx`

## 🔧 Configuration

### Vite Configuration

The project uses Vite with the following plugins:
- `@vitejs/plugin-react` for React support
- `vite-plugin-node-polyfills` for Node.js compatibility

### Tailwind Configuration

Includes the typography plugin for beautiful markdown rendering and custom color definitions.

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: Default (320px+)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

## 🚀 Deployment

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Vercel

1. Connect your repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy!

### GitHub Pages

1. Add `base: '/your-repo-name/'` to `vite.config.js`
2. Set up GitHub Actions for automatic deployment
3. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Router](https://reactrouter.com/) for client-side routing
- [React Markdown](https://github.com/remarkjs/react-markdown) for markdown rendering

---

Built with ❤️ by Raghav Kalyan
