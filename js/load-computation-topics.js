/**
 * Computational Physics Topics Loader
 * 
 * This script dynamically loads research topics from markdown files and displays them
 * in a structured format with expandable sections for papers and work.
 * 
 * To add a new topic:
 * 1. Create a new markdown file in work/markdown/ (e.g., new-topic.md)
 * 2. Add the topic configuration to the TOPICS array below
 * 3. Follow the markdown structure: # Title, ![image](path), Description, ## Key Publications, etc.
 */

document.addEventListener('DOMContentLoaded', function () {
    const topicsContainer = document.getElementById('research-topics-container');

    // Configuration for research topics
    // To add a new topic, simply add a new object to this array
    const TOPICS = [{
            id: 'emulators',
            title: 'Emulators',
            icon: 'ion-network',
            markdownFile: 'markdown/emulators.md',
            color: '#0078ff'
        },
        {
            id: 'toolkits',
            title: 'Toolkits',
            icon: 'ion-code-working',
            markdownFile: 'markdown/toolkits.md',
            color: '#4CAF50'
        }
    ];

    /**
     * Parse markdown content into structured sections
     */
    function parseMarkdownContent(markdown) {
        const sections = {
            title: '',
            image: '',
            description: '',
            publications: []
        };

        const lines = markdown.split('\n');
        let currentSection = 'header';
        let currentPaper = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Extract title (first # heading)
            if (line.startsWith('# ') && !sections.title) {
                sections.title = line.substring(2).trim();
                continue;
            }

            // Extract image
            if (line.startsWith('![') && !sections.image) {
                const match = line.match(/!\[.*?\]\((.*?)\)/);
                if (match) {
                    sections.image = match[1];
                }
                continue;
            }

            // Key Publications section
            if (line.startsWith('## Key Publications')) {
                currentSection = 'publications';
                continue;
            }

            // Paper title (### heading)
            if (line.startsWith('### ') && currentSection === 'publications') {
                if (currentPaper) {
                    sections.publications.push(currentPaper);
                }
                currentPaper = {
                    title: line.substring(4).trim(),
                    details: []
                };
                continue;
            }

            // Collect description before publications section
            if (currentSection === 'header' && line && !line.startsWith('#') && !line.startsWith('!')) {
                sections.description += line + ' ';
                continue;
            }

            // Collect paper details (bullets and other content)
            if (currentPaper && line) {
                currentPaper.details.push(line);
            }
        }

        // Add the last paper
        if (currentPaper) {
            sections.publications.push(currentPaper);
        }

        return sections;
    }

    /**
     * Create HTML for a single topic
     */
    function createTopicHTML(topic, content) {
        const topicId = topic.id;
        const color = topic.color;

        let html = `
            <div class="topic-section mb-5" id="${topicId}" style="border-left: 4px solid ${color}; padding-left: 20px;">
                <div class="topic-header mb-4">
                    <h3 class="mb-3" style="color: ${color};">
                        <i class="${topic.icon}" style="font-size: 1.2em;"></i> ${content.title}
                    </h3>
        `;

        // Add image if present
        if (content.image) {
            html += `
                    <div class="topic-image mb-3">
                        <img src="${content.image}" alt="${content.title}" class="img-fluid rounded" style="max-height: 300px; object-fit: cover;">
                    </div>
            `;
        }

        // Add description
        if (content.description) {
            html += `
                    <p class="lead">${content.description.trim()}</p>
            `;
        }

        html += `
                </div>
        `;

        // Add publications
        if (content.publications && content.publications.length > 0) {
            html += `
                <div class="topic-publications">
                    <h4 class="mb-3" style="color: ${color};">Key Publications</h4>
            `;

            content.publications.forEach(paper => {
                html += `
                    <div class="publication-card mb-4 p-4" style="background: #f8f9fa; border-left: 3px solid ${color}; border-radius: 5px;">
                        <h5 class="mb-3">${paper.title}</h5>
                        <div class="publication-details">
                `;

                // Process details (convert markdown to HTML)
                paper.details.forEach(detail => {
                    if (detail.startsWith('- ')) {
                        // It's a bullet point
                        const content = detail.substring(2);
                        // Convert markdown links to HTML
                        const htmlContent = content.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
                        html += `<p class="mb-1">${htmlContent}</p>`;
                    }
                    // Skip non-bullet lines (authors, journal info, etc.)
                });

                html += `
                        </div>
                    </div>
                `;
            });

            html += `
                </div>
            `;
        }

        html += `
            </div>
        `;

        return html;
    }

    /**
     * Load a single topic from its markdown file
     */
    async function loadTopic(topic) {
        try {
            const response = await fetch(topic.markdownFile);
            if (!response.ok) {
                throw new Error(`Failed to load ${topic.markdownFile}`);
            }

            const markdown = await response.text();
            const content = parseMarkdownContent(markdown);
            return createTopicHTML(topic, content);
        } catch (error) {
            console.error(`Error loading topic ${topic.id}:`, error);
            return `
                <div class="alert alert-warning" role="alert">
                    <strong>Error loading topic:</strong> ${topic.title}
                </div>
            `;
        }
    }

    /**
     * Load all topics and display them
     */
    async function loadAllTopics() {
        const loadingDiv = topicsContainer.querySelector('.text-center');

        try {
            // Load all topics in parallel
            const topicPromises = TOPICS.map(topic => loadTopic(topic));
            const topicHTMLs = await Promise.all(topicPromises);

            // Clear loading message
            topicsContainer.innerHTML = '';

            // Add navigation (optional - for jump-to functionality)
            let navHTML = '<div class="topic-navigation mb-4"><div class="btn-group" role="group">';
            TOPICS.forEach(topic => {
                navHTML += `
                    <a href="#${topic.id}" class="btn btn-outline-primary">
                        <i class="${topic.icon}"></i> ${topic.title}
                    </a>
                `;
            });
            navHTML += '</div></div>';
            topicsContainer.innerHTML = navHTML;

            // Add all topic sections
            topicHTMLs.forEach(html => {
                topicsContainer.innerHTML += html;
            });

        } catch (error) {
            console.error('Error loading topics:', error);
            topicsContainer.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <strong>Error!</strong> Failed to load research topics. Please try refreshing the page.
                </div>
            `;
        }
    }

    // Start loading topics
    loadAllTopics();
});