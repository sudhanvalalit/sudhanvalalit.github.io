# Sudhanva Lalit - Personal Academic Website

A modern, markdown-powered academic website for showcasing research, teaching, CV, and outreach activities.

## 🚀 Features

- **Markdown-Based Content Management** - Update your site by editing simple text files
- **Dedicated CV Page** - Professional CV with download/print options
- **Organized Content Structure** - Research, teaching, and outreach clearly separated
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Easy to Maintain** - No HTML knowledge required for content updates

## 📁 Project Structure

```
sudhanvalalit.github.io/
├── content/                    # 📝 Edit these markdown files to update your site
│   ├── research/              # Research content
│   │   ├── nuclear-astrophysics.md
│   │   ├── computation.md
│   │   └── machine-learning.md
│   ├── teaching/              # Teaching content
│   │   ├── physics.md
│   │   ├── mathematics.md
│   │   └── programming.md
│   ├── outreach/              # Outreach activities
│   │   └── outreach.md
│   └── cv.md                  # Your CV
│
├── index.html                 # Main homepage
├── cv.html                    # CV page
├── js/
│   ├── main.js               # Main JavaScript
│   └── markdown-loader.js    # Markdown content loader
├── css/                       # Stylesheets
├── img/                       # Images
├── blogs/                     # Blog posts
└── CONTENT-GUIDE.md          # 📖 How to update content
```

## 🎯 Quick Start

### Updating Your Website

1. **Edit Content**

   - Navigate to the `content/` directory
   - Open any `.md` file in a text editor
   - Make your changes using simple markdown formatting
   - Save the file

2. **Commit Changes** (if using Git)

   ```bash
   git add content/
   git commit -m "Updated research content"
   git push
   ```

3. **View Changes**
   - Visit your website (changes appear within minutes on GitHub Pages)
   - Or open `index.html` locally in a browser

### What You Can Update:

- **CV**: Edit `content/cv.md`
- **Research**: Edit files in `content/research/`
- **Teaching**: Edit files in `content/teaching/`
- **Outreach**: Edit `content/outreach/outreach.md`

## 📖 Documentation

- **[CONTENT-GUIDE.md](CONTENT-GUIDE.md)** - Complete guide on updating content
- **[CLEANUP.md](CLEANUP.md)** - Information about project organization

## 🛠️ Technology Stack

- **HTML5/CSS3** - Structure and styling
- **Bootstrap 4** - Responsive framework
- **JavaScript** - Dynamic functionality
- **Marked.js** - Markdown parsing
- **GitHub Pages** - Free hosting

## 📝 Markdown Basics

Markdown is a simple way to format text. Here are the essentials:

```markdown
# Heading 1

## Heading 2

### Heading 3

**Bold text**
_Italic text_

[Link text](https://example.com)
![Image](path/to/image.jpg)

- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2
```

See [CONTENT-GUIDE.md](CONTENT-GUIDE.md) for complete markdown reference.

## 🎨 Customization

### Changing Colors

The site uses a sky-blue theme by default. To change:

1. Open `index.html` and `cv.html`
2. Find the line: `<link href="css/style-sky-blue.css" rel="stylesheet">`
3. Replace with another theme:
   - `style-green.css`
   - `style-orange.css`
   - `style-purple.css`
   - `style-red.css`

### Adding Images

1. Place images in the `img/` directory
2. Reference in markdown:
   ```markdown
   ![Description](../img/your-image.jpg)
   ```

## 🌐 Deployment

### GitHub Pages (Recommended)

1. Push your repository to GitHub
2. Go to repository Settings → Pages
3. Select branch: `master` (or `main`)
4. Save
5. Your site will be live at: `https://yourusername.github.io`

### Local Development

1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   python -m http.server 8000
   # Visit: http://localhost:8000
   ```

## 📧 Contact Form

The contact form requires server-side processing. Current options:

1. **Formspree** - Free form backend (https://formspree.io)
2. **Netlify Forms** - If hosting on Netlify
3. **PHP Backend** - Use the included `contactform/` handler (requires PHP server)

## 🔧 Maintenance

### Adding New Content

**New Research Project:**

1. Create `content/research/new-project.md`
2. Add your content in markdown format
3. Link from main page or let it auto-load

**New Course:**

1. Edit `content/teaching/physics.md` (or relevant file)
2. Add course details in markdown

**Update CV:**

1. Edit `content/cv.md`
2. Add new publications, positions, etc.

### Troubleshooting

**Content not updating?**

- Clear browser cache
- Check file was saved
- Verify correct file path
- Wait a few minutes for GitHub Pages to rebuild

**Images not showing?**

- Check image path (use relative: `../img/...`)
- Verify image file exists
- Check filename case (case-sensitive on Linux/macOS)

## 📚 Resources

- **Markdown Guide**: https://www.markdownguide.org/
- **Bootstrap Docs**: https://getbootstrap.com/docs/4.6/
- **GitHub Pages**: https://pages.github.com/
- **Marked.js**: https://marked.js.org/

## 🤝 Contributing

This is a personal website, but suggestions for improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

This website's custom code and content are © 2025 Sudhanva Lalit. All Rights Reserved.

Original template components retain their respective licenses. Your own content remains your intellectual property.

## 🙏 Acknowledgments

- **Markdown Parser**: [Marked.js](https://marked.js.org/)
- **Comments**: [Utterances](https://utteranc.es/)
- **Icons**: Font Awesome, Ionicons
- **Framework**: Bootstrap 4

## 📞 Support

For questions about updating content, see [CONTENT-GUIDE.md](CONTENT-GUIDE.md)

For technical issues, refer to [CLEANUP.md](CLEANUP.md) or contact your web developer.

---

**Last Updated**: December 29, 2025  
**Version**: 2.0 - Markdown Content System  
**Maintained by**: Sudhanva Lalit

## 🎉 Quick Tips

1. **Easy Updates**: Just edit markdown files in `content/`
2. **No Coding**: No HTML or programming knowledge needed
3. **Version Control**: Use Git to track all changes
4. **Backup**: Keep old versions with Git commits
5. **Mobile-Friendly**: Site works on all devices automatically

---

**Ready to start?** Edit `content/cv.md` and add your complete CV, then move on to updating your research and teaching content!
