// Load and render testimonials dynamically
(function () {
    'use strict';

    // Fetch testimonials configuration
    fetch('testimonials/testimonials.json')
        .then(response => response.json())
        .then(testimonials => {
            // Load all testimonial texts
            const testimonialPromises = testimonials.map(testimonial => {
                return fetch(testimonial.file)
                    .then(response => response.text())
                    .then(text => {
                        return {
                            name: testimonial.name,
                            image: testimonial.image,
                            text: text.trim()
                        };
                    });
            });

            // Wait for all testimonials to load
            return Promise.all(testimonialPromises);
        })
        .then(loadedTestimonials => {
            // Get the carousel container
            const carouselContainer = document.getElementById('testimonial-mf');

            // Clear existing content
            carouselContainer.innerHTML = '';

            // Create testimonial boxes
            loadedTestimonials.forEach(testimonial => {
                const testimonialBox = document.createElement('div');
                testimonialBox.className = 'testimonial-box';

                testimonialBox.innerHTML = `
                    <div class="author-test">
                        <img src="${testimonial.image}" alt="${testimonial.name}" class="rounded-circle b-shadow-a" height="200px">
                        <span class="author">${testimonial.name}</span>
                    </div>
                    <div class="content-test">
                        <p class="description lead">${testimonial.text}</p>
                        <span class="comit"><i class="fa fa-quote-right"></i></span>
                    </div>
                `;

                carouselContainer.appendChild(testimonialBox);
            });

            // Reinitialize the owl carousel with loop enabled
            $('#testimonial-mf').owlCarousel('destroy'); // Destroy existing carousel if any
            $('#testimonial-mf').owlCarousel({
                margin: 20,
                loop: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error loading testimonials:', error);
        });
})();