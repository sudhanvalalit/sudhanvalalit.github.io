# Quick Start: Adding a New Research Topic

## Simple 3-Step Process

### 1. Create Your Markdown File

```bash
# Navigate to the markdown folder
cd work/markdown/

# Create a new file (replace 'my-topic' with your topic name)
nano my-topic.md
```

### 2. Use This Template

```markdown
# Your Topic Title

![Your Image](../img/NuclearAstro/your-image.jpg)

Your research description goes here. Explain what this topic is about
and why it's important to your work.

## Key Publications

### First Paper Title

- **Status**: Published
- **Description**: What the paper is about
- **DOI**: [Link](https://doi.org/...)
- **Key Results**: Main findings

### Second Paper Title

- **Status**: In Progress
- **Description**: What you're working on
```

### 3. Register the Topic

Edit `js/load-nuclear-astro-topics.js` and add to the TOPICS array:

```javascript
{
    id: 'my-topic',
    title: 'My Topic Title',
    icon: 'ion-nuclear',
    markdownFile: '../work/markdown/my-topic.md',
    color: '#0078ff'
}
```

## That's It!

Your new topic will automatically appear on the Nuclear Astrophysics page.

## Quick Icon Reference

- `ion-nuclear` - Nuclear/atomic
- `ion-fireball` - Explosions
- `ion-flash` - Bursts/flashes
- `ion-ios-snowy` - Cooling
- `ion-stats-bars` - Statistics/data
- `ion-planet` - Celestial objects

## Quick Color Reference

- Blue: `#0078ff`
- Green: `#4CAF50`
- Red: `#FF5722`
- Orange: `#FFC107`
- Purple: `#9C27B0`

---

**Need more details?** See `README-TOPICS.md` for the complete guide.
