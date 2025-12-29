/**
 * Markdown Content Loader
 * This script dynamically loads and renders markdown files from the content directory
 */

class MarkdownContentLoader {
    constructor() {
        // Use marked.js for markdown parsing
        // Make sure to include: <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
        this.marked = window.marked || null;
        if (!this.marked) {
            console.error('Marked.js is not loaded. Please include it in your HTML.');
        }
    }

    /**
     * Load and render a markdown file into a target element
     * @param {string} filePath - Path to the markdown file
     * @param {string} targetElementId - ID of the element to render content into
     */
    async loadMarkdown(filePath, targetElementId) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
            }

            const markdownText = await response.text();
            const htmlContent = this.marked.parse(markdownText);

            const targetElement = document.getElementById(targetElementId);
            if (targetElement) {
                targetElement.innerHTML = htmlContent;
            } else {
                console.error(`Target element #${targetElementId} not found`);
            }
        } catch (error) {
            console.error('Error loading markdown:', error);
            const targetElement = document.getElementById(targetElementId);
            if (targetElement) {
                targetElement.innerHTML = `<p class="text-danger">Error loading content: ${error.message}</p>`;
            }
        }
    }

    /**
     * Load multiple markdown files and render them in a grid/card layout
     * @param {Array} files - Array of objects with {path, title, icon} properties
     * @param {string} targetElementId - ID of the container element
     */
    async loadMultipleMarkdown(files, targetElementId) {
        const container = document.getElementById(targetElementId);
        if (!container) {
            console.error(`Container #${targetElementId} not found`);
            return;
        }

        container.innerHTML = ''; // Clear existing content

        for (const file of files) {
            try {
                const response = await fetch(file.path);
                if (!response.ok) {
                    console.warn(`Failed to load ${file.path}: ${response.statusText}`);
                    continue;
                }

                const markdownText = await response.text();
                const htmlContent = this.marked.parse(markdownText);

                // Create a card element
                const cardDiv = document.createElement('div');
                cardDiv.className = 'col-md-4 mb-4';
                cardDiv.innerHTML = `
          <div class="work-box">
            <div class="work-content">
              <h3 class="w-title">${file.title}</h3>
              <div class="markdown-content">
                ${htmlContent}
              </div>
            </div>
          </div>
        `;

                container.appendChild(cardDiv);
            } catch (error) {
                console.error(`Error loading ${file.path}:`, error);
            }
        }
    }

    /**
     * Load markdown and extract a summary (first paragraph or first N characters)
     * @param {string} filePath - Path to the markdown file
     * @param {number} maxLength - Maximum length of summary
     * @returns {Promise<string>} - Summary text
     */
    async getMarkdownSummary(filePath, maxLength = 200) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }

            const markdownText = await response.text();
            // Remove markdown syntax for summary
            const plainText = markdownText
                .replace(/^#+ .+$/gm, '') // Remove headers
                .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
                .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '') // Remove images
                .replace(/[*_`]/g, '') // Remove emphasis markers
                .trim();

            return plainText.length > maxLength ?
                plainText.substring(0, maxLength) + '...' :
                plainText;
        } catch (error) {
            console.error('Error getting summary:', error);
            return '';
        }
    }

    /**
     * Create a table of contents from markdown headings
     * @param {string} markdownText - The markdown content
     * @returns {string} - HTML for table of contents
     */
    generateTableOfContents(markdownText) {
        const headings = [];
        const lines = markdownText.split('\n');

        lines.forEach((line, index) => {
            const match = line.match(/^(#{1,6})\s+(.+)$/);
            if (match) {
                const level = match[1].length;
                const text = match[2];
                const id = text.toLowerCase().replace(/[^\w]+/g, '-');
                headings.push({
                    level,
                    text,
                    id
                });
            }
        });

        if (headings.length === 0) return '';

        let tocHtml = '<nav class="table-of-contents"><ul>';
        headings.forEach(heading => {
            const indent = '  '.repeat(heading.level - 1);
            tocHtml += `${indent}<li><a href="#${heading.id}">${heading.text}</a></li>`;
        });
        tocHtml += '</ul></nav>';

        return tocHtml;
    }
}

// Initialize the loader when DOM is ready
let mdLoader;
document.addEventListener('DOMContentLoaded', () => {
    mdLoader = new MarkdownContentLoader();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarkdownContentLoader;
}