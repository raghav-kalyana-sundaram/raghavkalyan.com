# Content Management Guide

This guide explains how to manage content for your personal portfolio website.

## Content Structure

All content is stored in markdown files within the `src/content/` directory, organized by type:

```
src/content/
├── articles/     # Blog posts and articles
├── projects/     # Project showcases
├── notes/        # Quick notes and thoughts
└── videos/       # Video content descriptions
```

## Adding New Content

### 1. Choose the Content Type

Decide which type of content you're creating:
- **Articles**: Long-form blog posts, tutorials, insights
- **Projects**: Portfolio projects, case studies, demos
- **Notes**: Quick thoughts, tips, short-form content
- **Videos**: Video content descriptions, tutorials, presentations

### 2. Create the Markdown File

Create a new `.md` file in the appropriate directory with a descriptive filename:

```bash
# Examples
src/content/articles/my-new-article.md
src/content/projects/react-portfolio.md
src/content/notes/quick-tip.md
src/content/videos/intro-to-react.md
```

### 3. Add Frontmatter

Every markdown file must include YAML frontmatter at the top:

```yaml
---
title: "Your Content Title"
date: "2024-01-15"
excerpt: "A brief description of your content that will appear in previews"
---
```

**Required Fields:**
- `title`: The main title of your content
- `date`: Publication date in YYYY-MM-DD format
- `excerpt`: A short description (1-2 sentences)

**Optional Fields:**
- `tags`: Array of tags for categorization
- `author`: Author name (if different from site owner)
- `image`: Featured image path

### 4. Write Your Content

After the frontmatter, write your content using standard markdown:

```markdown
# Main Heading

Your content goes here...

## Subheading

- Bullet points
- More content

### Code Examples

```javascript
console.log("Hello, World!");
```

## Images

To include images, place them in the `public/` directory and reference them:

```markdown
![Alt text](/path-to-image.jpg)
```

## Content Guidelines

### Writing Style
- Keep titles clear and descriptive
- Write engaging excerpts that encourage clicks
- Use proper markdown formatting
- Include relevant images and code examples
- Keep paragraphs short and readable

### File Naming
- Use lowercase letters
- Separate words with hyphens
- Be descriptive but concise
- Avoid special characters

### Examples
- ✅ `building-react-apps.md`
- ✅ `chess-strategy-tips.md`
- ❌ `My Article.md`
- ❌ `article1.md`

## Content Types Explained

### Articles
Long-form content like:
- Tutorials and guides
- Technical deep-dives
- Industry insights
- Personal experiences

### Projects
Portfolio showcases like:
- Web applications
- Open source contributions
- Case studies
- Code demos

### Notes
Short-form content like:
- Quick tips
- Thoughts and reflections
- Book notes
- Conference takeaways

### Videos
Video content like:
- Tutorial videos
- Presentations
- Interviews
- Live streams

## Best Practices

1. **Consistency**: Use consistent formatting across all content
2. **SEO**: Write descriptive titles and excerpts
3. **Images**: Optimize images for web use
4. **Links**: Use relative links for internal content
5. **Code**: Use proper syntax highlighting for code blocks
6. **Updates**: Keep content current and relevant

## Troubleshooting

### Content Not Appearing
- Check that frontmatter is properly formatted
- Ensure all required fields are present
- Verify the file is in the correct directory
- Check for syntax errors in markdown

### Build Errors
- Validate YAML frontmatter syntax
- Check for special characters in filenames
- Ensure markdown is properly formatted

### Images Not Loading
- Verify image path is correct
- Check that image is in the `public/` directory
- Use absolute paths starting with `/`

## Examples

### Article Example
```markdown
---
title: "Building a Modern Portfolio with React"
date: "2024-01-15"
excerpt: "Learn how to create a professional portfolio website using React, Vite, and Tailwind CSS."
---

# Building a Modern Portfolio with React

In this article, I'll walk you through the process of building a modern portfolio website...
```

### Project Example
```markdown
---
title: "E-commerce Platform"
date: "2024-01-10"
excerpt: "A full-stack e-commerce platform built with React, Node.js, and MongoDB."
---

# E-commerce Platform

A complete e-commerce solution with user authentication, product management, and payment processing.

## Technologies Used

- React
- Node.js
- MongoDB
- Stripe API

## Features

- User authentication
- Product catalog
- Shopping cart
- Payment processing
- Admin dashboard
```

This guide should help you maintain consistent, high-quality content for your portfolio website! 