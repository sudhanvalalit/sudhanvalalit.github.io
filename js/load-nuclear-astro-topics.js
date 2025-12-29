/**
 * Nuclear Astrophysics Topics Loader
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
            id: 'dense-matter-eos',
            title: 'Dense Matter Equations of State',
            icon: 'ion-nuclear',
            markdownFile: '../work/markdown/dense-matter-eos.md',
            color: '#0078ff'
        },
        {
            id: 'neutron-star-cooling',
            title: 'Neutron Star Cooling',
            icon: 'ion-ios-snowy',
            markdownFile: '../work/markdown/neutron-star-cooling.md',
            color: '#4CAF50'
        },
        {
            id: 'supernovae-processes',
            title: 'Neutrino processes',
            icon: 'ion-fireball',
            markdownFile: '../work/markdown/supernovae-processes.md',
            color: '#FF5722'
        },
        {
            id: 'xray-bursts',
            title: 'Superburst and X-Ray Bursts',
            icon: 'ion-flash',
            markdownFile: '../work/markdown/xray-bursts.md',
            color: '#FFC107'
        }
    ];

    /**
     * Parse markdown content into structured sections
     */
    function parseMarkdownContent(markdown) {
        const htmlContent = marked.parse(markdown);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        // Extract main title (H1)
        const titleElement = tempDiv.querySelector('h1');
        const title = titleElement ? titleElement.textContent : 'No Title';
        if (titleElement) titleElement.remove();

        // Extract main image
        const imageElement = tempDiv.querySelector('img');
        const imageUrl = imageElement ? imageElement.src : '';
        const imageAlt = imageElement ? imageElement.alt : '';
        if (imageElement) imageElement.parentElement.remove(); // Remove the paragraph containing the image

        // Extract description (content before "Key Publications")
        const keyPubsHeading = Array.from(tempDiv.querySelectorAll('h2')).find(h => h.textContent.includes('Key Publications'));
        let description = '';

        if (keyPubsHeading) {
            // Get all nodes before Key Publications heading
            let currentNode = tempDiv.firstChild;
            const descriptionNodes = [];
            while (currentNode && currentNode !== keyPubsHeading) {
                descriptionNodes.push(currentNode.cloneNode(true));
                currentNode = currentNode.nextSibling;
            }
            const descDiv = document.createElement('div');
            descriptionNodes.forEach(node => descDiv.appendChild(node));
            description = descDiv.innerHTML;
        } else {
            description = tempDiv.innerHTML;
        }

        // Extract publications (H3 sections after "Key Publications")
        const publications = [];
        if (keyPubsHeading) {
            let currentNode = keyPubsHeading.nextSibling;
            let currentPub = null;

            while (currentNode) {
                if (currentNode.tagName === 'H3') {
                    if (currentPub) publications.push(currentPub);
                    currentPub = {
                        title: currentNode.textContent,
                        content: ''
                    };
                } else if (currentPub && currentNode.tagName === 'UL') {
                    currentPub.content = currentNode.outerHTML;
                }
                currentNode = currentNode.nextSibling;
            }
            if (currentPub) publications.push(currentPub);
        }

        return {
            title,
            imageUrl,
            imageAlt,
            description,
            publications
        };
    }

    /**
     * Create HTML for a research topic section
     */
    function createTopicHTML(topic, content) {
        const {
            imageUrl,
            imageAlt,
            description,
            publications
        } = content;

        let publicationsHTML = '';
        if (publications.length > 0) {
            publicationsHTML = publications.map(pub => `
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2">${pub.title}</h6>
                        <div class="publication-details">
                            ${pub.content}
                        </div>
                    </div>
                </div>
            `).join('');
        }

        return `
            <div class="topic-section mb-5" id="${topic.id}">
                <div class="row">
                    <div class="col-12">
                        <div class="topic-header" style="border-left: 4px solid ${topic.color}; padding-left: 15px; margin-bottom: 20px;">
                            <h3 class="topic-title">
                                <i class="${topic.icon}" style="color: ${topic.color};"></i>
                                ${topic.title}
                            </h3>
                        </div>
                    </div>
                </div>
                <div class="row">
                    ${imageUrl ? `
                    <div class="col-md-5">
                        <div class="topic-image-container">
                            <img src="${imageUrl}" alt="${imageAlt}" class="img-fluid rounded shadow-sm" style="width: 100%; height: auto;">
                        </div>
                    </div>
                    ` : ''}
                    <div class="${imageUrl ? 'col-md-7' : 'col-12'}">
                        <div class="topic-description">
                            ${description}
                        </div>
                    </div>
                </div>
                ${publicationsHTML ? `
                <div class="row mt-4">
                    <div class="col-12">
                        <h5 style="color: ${topic.color};">Key Publications & Work</h5>
                        <div class="publications-container">
                            ${publicationsHTML}
                        </div>
                    </div>
                </div>
                ` : ''}
                <hr class="mt-5" style="border-color: ${topic.color}; opacity: 0.2;">
            </div>
        `;
    }

    /**
     * Load a single topic
     */
    async function loadTopic(topic) {
        try {
            const response = await fetch(topic.markdownFile);
            if (!response.ok) {
                throw new Error(`Failed to load ${topic.title}: ${response.status}`);
            }
            const markdown = await response.text();
            const content = parseMarkdownContent(markdown);
            return createTopicHTML(topic, content);
        } catch (error) {
            console.error(`Error loading topic ${topic.id}:`, error);
            return `
                <div class="alert alert-warning" role="alert">
                    <strong>Error loading ${topic.title}</strong>
                    <p>Please check if the markdown file exists at: ${topic.markdownFile}</p>
                </div>
            `;
        }
    }

    /**
     * Load all topics and display them
     */
    async function loadAllTopics() {
        try {
            const topicHTMLs = await Promise.all(TOPICS.map(topic => loadTopic(topic)));
            topicsContainer.innerHTML = topicHTMLs.join('');
        } catch (error) {
            console.error('Error loading topics:', error);
            topicsContainer.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <strong>Error loading research topics</strong>
                    <p>There was a problem loading the research content. Please try refreshing the page.</p>
                </div>
            `;
        }
    }

    // Create a navigation menu for topics
    function createTopicNavigation() {
        const navHTML = `
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-subtitle mb-3 text-muted">Jump to Topic:</h6>
                            <div class="topic-nav-buttons">
                                ${TOPICS.map(topic => `
                                    <a href="#${topic.id}" class="btn btn-outline-primary btn-sm mr-2 mb-2">
                                        <i class="${topic.icon}"></i> ${topic.title}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        topicsContainer.insertAdjacentHTML('afterbegin', navHTML);
    }

    // Initialize
    loadAllTopics().then(() => {
        // Add navigation after content is loaded
        createTopicNavigation();
    });
});