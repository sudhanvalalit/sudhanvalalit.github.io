# Blog System Documentation

## Overview

This blog system allows you to create beautiful, professional blog posts using Markdown format with built-in commenting functionality powered by GitHub Discussions (via utterances).

## Features

- ✍️ **Markdown Support**: Write posts in simple Markdown format
- 💬 **Comments**: GitHub-based commenting system (no external accounts needed)
- 🎨 **Professional Design**: Clean, readable layout optimized for long-form content
- 🌓 **Dark Mode**: Automatic theme switching with persistence
- 📱 **Responsive**: Works perfectly on all devices
- 🔍 **SEO Friendly**: Proper meta tags and semantic HTML

## Creating a New Blog Post

### Step 1: Write Your Markdown Content

Create a new `.md` file in the `blogs/posts/` directory:

```bash
blogs/posts/my-new-post.md
```

Write your content using standard Markdown:

```markdown
# My Post Title

Your introduction paragraph here...

## Section Heading

Content with **bold**, _italic_, and [links](https://example.com).

### Subsection

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2

> This is a blockquote

![Image Description](../img/my-image.jpg)

\`\`\`python

# Code blocks are supported

def hello():
print("Hello, World!")
\`\`\`
```

### Step 2: Create Your Blog Post HTML

1. Copy `blog-template.html` to a new file:

   ```bash
   cp blogs/blog-template.html blogs/my-new-post.html
   ```

2. Edit the `BLOG_CONFIG` object in the new file:

```javascript
const BLOG_CONFIG = {
  markdownFile: "posts/my-new-post.md", // Your markdown file
  title: "My Amazing Blog Post", // Post title
  date: "December 29, 2025", // Publication date
  author: "Sudhanva Lalit", // Author name
  readTime: "8 min read", // Estimated reading time
  tags: ["Physics", "Research", "Travel"], // Post tags
};
```

3. Save the file!

### Step 3: Add to Main Blog Page (Optional)

Update `index.html` to link to your new post:

```html
<div class="blog-item">
  <div class="row align-items-center mb-5">
    <div class="col-md-3 text-center mb-3 mb-md-0">
      <div class="blog-icon">
        <span
          class="ion-paper-airplane"
          style="font-size: 3rem; color: #0078ff;"
        ></span>
      </div>
      <div class="blog-type mt-2">
        <strong
          ><a href="blogs/my-new-post.html" style="color: #0078ff;"
            >Read More</a
          ></strong
        >
      </div>
    </div>
    <div class="col-md-9">
      <h5 class="blog-title">
        <a href="blogs/my-new-post.html" style="color: inherit;"
          >My Amazing Blog Post</a
        >
      </h5>
      <p class="text-muted">A brief description of your blog post content...</p>
    </div>
  </div>
</div>
```

## Markdown Features Supported

### Headers

```markdown
# H1 Heading

## H2 Heading

### H3 Heading
```

### Text Formatting

```markdown
**Bold text**
_Italic text_
**_Bold and italic_**
`Inline code`
~~Strikethrough~~
```

### Lists

```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
```

### Links and Images

```markdown
[Link text](https://example.com)
![Image alt text](../img/image.jpg)
```

### Code Blocks

````markdown
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
````

### Blockquotes

```markdown
> This is a quote
> It can span multiple lines
```

### Tables

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Comments System

### Setup (One-time)

The comments system uses [utterances](https://utteranc.es/), which requires:

1. Your repository to be public
2. The [utterances app](https://github.com/apps/utterances) installed on your repo
3. Enable GitHub Discussions in your repository settings

To enable GitHub Discussions:

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Features**
4. Check **Discussions**

### How It Works

- Comments are stored as GitHub Discussion posts
- Readers can comment using their GitHub account
- You get notifications for new comments
- All comment moderation happens through GitHub
- Comments are automatically themed to match light/dark mode

## File Structure

```
blogs/
├── README.md                 # This file
├── blog-template.html        # Template for new posts
├── my-post-1.html           # Individual blog post page
├── my-post-2.html           # Another blog post page
└── posts/
    ├── my-post-1.md         # Markdown content
    └── my-post-2.md         # More markdown content
```

## Best Practices

### Writing

1. **Start with a hook**: Grab attention in the first paragraph
2. **Use headers**: Break content into scannable sections
3. **Add images**: Visual content increases engagement
4. **Include code examples**: Especially for technical posts
5. **End with a call-to-action**: Encourage comments and discussion

### Images

- Store images in `img/` directory
- Use descriptive filenames: `neutron-star-diagram.jpg` not `img1.jpg`
- Optimize images for web (< 500KB recommended)
- Use relative paths: `../img/my-image.jpg`

### SEO

- Use descriptive titles (50-60 characters)
- Include relevant keywords naturally
- Add meta descriptions in the HTML file
- Use proper heading hierarchy (H1 → H2 → H3)

## Examples

See the sample posts for reference:

- `blogs/posts/sample-travel.md` - Travel blog example
- `blogs/posts/sample-til.md` - Technical "Today I Learned" example

## Troubleshooting

### Markdown Not Rendering

- Check the `markdownFile` path in `BLOG_CONFIG`
- Ensure the markdown file exists in `posts/` directory
- Check browser console for errors

### Comments Not Showing

- Verify utterances app is installed on your repo
- Check that GitHub Discussions is enabled
- Ensure repository is public

### Dark Mode Not Working

- Clear browser localStorage
- Check if theme-toggle button has the correct ID
- Verify dark mode CSS is included

## Advanced Customization

### Custom Styling

Add custom CSS in the `<style>` section of your blog post HTML:

```css
.custom-class {
  /* Your styles */
}
```

### Custom JavaScript

Add functionality in the `<script>` section:

```javascript
// Custom code here
```

### Different Comment Systems

To use a different comment system (e.g., Disqus), replace the utterances script in the comments section.

## Support

For issues or questions:

- Check this README
- Review sample posts
- Consult [Marked.js documentation](https://marked.js.org/)
- Visit [utterances documentation](https://utteranc.es/)

---

Happy blogging! 🎉
