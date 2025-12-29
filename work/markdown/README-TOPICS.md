# Research Topics - User Guide

This document explains how to manage and add new research topics to the Nuclear Astrophysics, Nuclear Structure, and Computational Physics pages.

## Current Topics

### Nuclear Astrophysics (NuclearAstro.html)

1. **Dense Matter Equations of State** - `dense-matter-eos.md`
2. **Neutron Star Cooling** - `neutron-star-cooling.md`
3. **Neutrino processes** - `supernovae-processes.md`
4. **Superburst and X-Ray Bursts** - `xray-bursts.md`

### Nuclear Structure (NuclearStructure.html)

1. **Density Functional Theory** - `density-functional-theory.md`
2. **Bayesian Methods** - `bayesian-methods.md`

### Computational Physics (Computation.html)

1. **Emulators** - `emulators.md`
2. **Toolkits** - `toolkits.md`

## Automatic Citation Updates

**Important:** Citation counts in your research topics are automatically updated when you run `update_cv_from_inspire.py` or when GitHub Actions runs the weekly update.

To ensure your citations update automatically:

- Include DOI or arXiv links in your markdown files
- Add `**Citations:** <number>` within ~200 characters after the DOI/arXiv link
- The script will match publications by DOI/arXiv and update the citation counts from InspireHEP

Example format that enables automatic updates:

```markdown
### Paper Title

Authors, list  
_Journal_ Volume (Year)

- [DOI: 10.1103/PhysRevD.100.103022](https://doi.org/10.1103/PhysRevD.100.103022)
- [arXiv:1906.04095](https://arxiv.org/abs/1906.04095)
- **Citations:** 99
```

## Adding a New Topic

### Step 1: Create a Markdown File

Create a new file in `work/markdown/` following this template:

```markdown
# Topic Title

![Topic Image](../img/path-to-image.jpg)

Brief description of the research topic. This will appear at the top of your topic section.

## Key Publications

### Paper or Work Title 1

- **Status**: Published/In Progress/Planned
- **Description**: Brief description of the work
- **DOI**: [Link text](https://doi.org/...)
- **Key Results**: Main findings or outcomes
- **Collaborators**: Institution names

### Paper or Work Title 2

- **Status**: Published/In Progress/Planned
- **Description**: Brief description of the work
- **Key Results**: Main findings

[Add as many papers as needed]
```

### Step 2: Add Topic to Configuration

Edit `js/load-nuclear-astro-topics.js` and add your topic to the `TOPICS` array:

```javascript
const TOPICS = [
  // ... existing topics ...
  {
    id: "your-topic-id", // Unique identifier (lowercase, use hyphens)
    title: "Your Topic Title", // Display title
    icon: "ion-icon-name", // Ionicons icon class
    markdownFile: "../work/markdown/your-file.md", // Path to your markdown file
    color: "#HEX_COLOR", // Hex color for accents
  },
];
```

### Step 3: Add an Image (Optional but Recommended)

- Place your image in `img/NuclearAstro/` or `img/`
- Reference it in your markdown file using: `![Description](../img/NuclearAstro/image-name.jpg)`

## Markdown Structure Guide

### Main Title (H1)

Use `#` for the main topic title:

```markdown
# Dense Matter Equations of State
```

### Image

Add immediately after title:

```markdown
![EoS Plot](../img/NuclearAstro/plot.jpg)
```

### Description

Write 1-2 paragraphs describing the topic:

```markdown
Understanding the equation of state (EoS) of dense nuclear matter is crucial...
```

### Publications Section (H2)

Use `##` for the publications heading:

```markdown
## Key Publications
```

### Individual Papers (H3)

Use `###` for each paper title:

```markdown
### Finite Temperature Nuclear Matter Calculations
```

### Paper Details

Use bullet points with bold labels:

```markdown
- **Status**: Published
- **Description**: Comprehensive study of...
- **DOI**: [10.1234/example](https://doi.org/10.1234/example)
- **Key Results**: Main findings here
- **Collaborators**: JINA-CEE, INPP
```

## Available Icons

Choose from these Ionicons (or browse at https://ionic.io/ionicons/v2):

- `ion-nuclear` - Radiation/nuclear symbol
- `ion-ios-snowy` - Cooling/frost
- `ion-fireball` - Explosions/supernovae
- `ion-flash` - Bursts/flashes
- `ion-stats-bars` - Data/statistics
- `ion-planet` - Planets/stars
- `ion-cube` - Structure
- `ion-android-globe` - Global/universal

## Color Suggestions

Choose colors that visually distinguish topics:

- Blue: `#0078ff` - Default, equations
- Green: `#4CAF50` - Cooling, stability
- Red/Orange: `#FF5722` - Heat, explosions
- Yellow/Amber: `#FFC107` - Bursts, flashes
- Purple: `#9C27B0` - Structure, composition
- Teal: `#009688` - Observations

## Editing Existing Topics

1. Locate the markdown file in `work/markdown/`
2. Edit the content following the structure above
3. Save the file - changes will appear automatically on page reload

## Tips for Great Content

1. **Keep descriptions concise** - 1-3 paragraphs max
2. **Use high-quality images** - Plots, diagrams, or relevant imagery
3. **Link to papers** - Use DOI links when available
4. **Update status** - Keep publication status current
5. **Credit collaborators** - Acknowledge institutions and partners
6. **Organize chronologically** - List newest papers first

## Troubleshooting

**Topic not showing up?**

- Check the file path in `TOPICS` array
- Verify markdown file exists in `work/markdown/`
- Check browser console for errors

**Image not displaying?**

- Verify image path is correct relative to the HTML file
- Check that image file exists in the specified location
- Use `../img/` to go up from work/ to img/

**Formatting looks wrong?**

- Ensure you're using the correct number of `#` for headings
- Check that bullet points start with `-` followed by space
- Verify bold formatting uses `**text**`

## Example Complete Topic

See `work/markdown/dense-matter-eos.md` for a complete example with all elements.
