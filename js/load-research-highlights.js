document.addEventListener('DOMContentLoaded', function () {
    const highlightsContainer = document.getElementById('research-highlights-container');

    // List of your Markdown files for research highlights
    // These paths are relative to where load-research-highlights.js is located in the HTML.
    // If NuclearAstro.html is in 'work/' and this JS is in 'js/',
    // then the path to Markdown files in 'work/markdown/' needs to go up to 'work/' then down to 'markdown/'
    const markdownFiles = [
        '../work/markdown/eos-importance.md',
        '../work/markdown/neutron-star-composition.md',
        // Add more Markdown files here as you create them
    ];

    async function loadMarkdownHighlight(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();

            // Parse Markdown to HTML
            const htmlContent = marked.parse(markdown);

            // Extract elements to fit into card structure (adjust as needed based on your markdown structure)
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;

            const titleElement = tempDiv.querySelector('h1, h2, h3, h4, h5, h6'); // Find the first heading for the title
            const imageElement = tempDiv.querySelector('img'); // Find the first image
            const links = tempDiv.querySelectorAll('a'); // Find all links

            // Remove title, image, and links from the main content for the description
            if (titleElement) titleElement.remove();
            if (imageElement) imageElement.remove();
            links.forEach(link => link.remove()); // Remove links from general description

            const descriptionHtml = tempDiv.innerHTML; // Remaining content is the description

            const title = titleElement ? titleElement.textContent : 'No Title';
            const imageUrl = imageElement ? imageElement.src : '';
            const imageAlt = imageElement ? imageElement.alt : '';

            // Build the card HTML
            let cardHtml = `
                <div class="col-md-6 col-lg-4"> <div class="card research-card">
                        ${imageUrl ? `<img src="${imageUrl}" class="card-img-top" alt="${imageAlt}">` : ''}
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <div class="card-text">${descriptionHtml}</div>
                            <div class="card-link mt-auto"> `;

            // Add extracted links
            links.forEach(link => {
                cardHtml += `<a href="${link.href}" class="btn btn-sm btn-primary" target="_blank" style="margin-right: 10px; margin-bottom: 5px;">${link.textContent}</a>`;
            });

            cardHtml += `
                            </div>
                        </div>
                    </div>
                </div>
            `;
            return cardHtml;

        } catch (error) {
            console.error('Error loading Markdown file:', filePath, error);
            return `<div class="col-12"><p class="text-danger">Failed to load highlight from ${filePath}.</p></div>`;
        }
    }

    async function renderHighlights() {
        highlightsContainer.innerHTML = ''; // Clear loading message

        // Optionally, sort highlights if you want a specific order (e.g., by date if you add it to markdown)
        // For now, they'll load in the order defined in markdownFiles array.

        const highlightPromises = markdownFiles.map(loadMarkdownHighlight);
        const highlightCards = await Promise.all(highlightPromises);

        highlightCards.forEach(cardHtml => {
            highlightsContainer.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    renderHighlights();
});