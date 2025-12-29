# Testimonials System

This directory contains the dynamic testimonials system for the website. Testimonials are loaded from individual text files and rendered dynamically on the homepage.

## File Structure

```
testimonials/
├── testimonials.json    # Configuration file with testimonial metadata
├── abhishek.txt         # Abhishek Hingrajiya's testimonial
├── kaushal.txt          # Kaushal Patel's testimonial
├── akshay.txt           # Dr. Akshay Vaghani's testimonial
├── dushyant.txt         # Dushyant Vazarkar's testimonial
└── README.md            # This file
```

## How to Add a New Testimonial

### Step 1: Create a Text File

Create a new `.txt` file in the `testimonials/` directory with the testimonial content. The filename should be descriptive (e.g., `john-doe.txt`).

**Example:** `testimonials/john-doe.txt`

```
Your testimonial text goes here. You can write multiple paragraphs.

Each paragraph should be separated by a blank line.

Keep the text focused and professional.
```

### Step 2: Add Entry to testimonials.json

Open `testimonials.json` and add a new entry to the array:

```json
{
  "name": "John Doe",
  "image": "img/john-doe.jpeg",
  "file": "testimonials/john-doe.txt"
}
```

**Fields:**

- `name`: The person's full name (displayed below their photo)
- `image`: Path to their profile image (should be in the `img/` directory)
- `file`: Path to the testimonial text file (relative to the root)

### Step 3: Add Profile Image

Place the person's profile image in the `img/` directory. The image should be:

- Square or circular aspect ratio
- Reasonable file size (< 500KB)
- Named consistently with the entry in testimonials.json

### Complete Example

1. Create `testimonials/maria-garcia.txt`:

```
Maria is an exceptional physicist with deep knowledge of quantum mechanics...
```

2. Add image: Save `img/maria-garcia.jpeg`

3. Update `testimonials.json`:

```json
[
  {
    "name": "Abhishek Hingrajiya",
    "image": "img/abhishek.jpeg",
    "file": "testimonials/abhishek.txt"
  },
  ...existing entries...,
  {
    "name": "Maria Garcia",
    "image": "img/maria-garcia.jpeg",
    "file": "testimonials/maria-garcia.txt"
  }
]
```

## Carousel Settings

The testimonials carousel automatically:

- **Loops continuously** - Returns to the first testimonial after the last one
- **Auto-plays** - Advances every 5 seconds
- **Pauses on hover** - Stops auto-play when mouse hovers over testimonials
- **Responsive** - Shows 1 testimonial at a time on all screen sizes

To modify carousel behavior, edit `js/load-testimonials.js`:

```javascript
$("#testimonial-mf").owlCarousel({
  margin: 20,
  loop: true, // Enable continuous loop
  autoplay: true, // Enable auto-play
  autoplayTimeout: 5000, // 5 seconds between slides
  autoplayHoverPause: true, // Pause on hover
  responsive: {
    0: { items: 1 }, // Always show 1 item
  },
});
```

## Troubleshooting

### Testimonials not loading

1. Check browser console for errors (F12 → Console tab)
2. Verify `testimonials.json` is valid JSON (use jsonlint.com)
3. Ensure all file paths are correct and files exist

### Images not showing

1. Verify image exists in the `img/` directory
2. Check image path in `testimonials.json` matches actual file
3. Ensure image file extensions are lowercase (.jpeg, .jpg, .png)

### Carousel not looping

1. Check that `loop: true` is set in `js/load-testimonials.js`
2. Ensure you have at least 2 testimonials (carousels need multiple items to loop)
3. Verify Owl Carousel library is loaded (`lib/owlcarousel/owl.carousel.min.js`)

## Removing a Testimonial

To remove a testimonial:

1. Delete (or comment out) its entry in `testimonials.json`
2. Optionally delete the associated text file
3. Optionally delete the associated image file

The testimonials will automatically update on the next page load.

## Technical Details

### Loading Process

1. **Fetch Config**: `js/load-testimonials.js` loads `testimonials.json`
2. **Load Content**: Script fetches each testimonial's text file
3. **Render HTML**: Creates testimonial boxes with images and text
4. **Initialize Carousel**: Owl Carousel is initialized with loop enabled

### Dependencies

- jQuery (for AJAX and Owl Carousel)
- Owl Carousel (for carousel functionality)
- Bootstrap (for responsive layout)

All dependencies are already included in the website's libraries.
